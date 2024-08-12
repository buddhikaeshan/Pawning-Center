const jwt = require('jsonwebtoken');
const UserModel = require('../../models/User');
const {sendEmail } = require('../common');


// JWT secret key
const secretKey = 'AbCd';

async function login(req, res) {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Find user by email in the database
        const user = await UserModel.findOne({ email });

        // If user not found, send error response
        if (!user) {
            res.json({
                message_type: "error",
                message: "Incorrect email or password."
            });
        } else {
            // If user exists and uses email login
            if (user.login_type === "email") {
                // If password matches, generate JWT token and send success response
                if (user.password === password) {
                    if (user.user_status === "inactive") {
                        res.json({
                            message_type: "error",
                            message: "Your account is inactive. Please contact an admin for further information."
                        });
                    } else {
                        const token = jwt.sign({ userId: user.email }, secretKey, { expiresIn: '6h' });
                        res.json({ message_type: "success", message: "User signed in successfully.", email: user.email, user_type: user.user_type, name: user.name, user_status: user.user_status, profile_completed: user.profile_completed, token });
                    }
                } else {
                    // If password doesn't match, send error response
                    res.json({
                        message_type: "error",
                        message: "Incorrect email or password."
                    });
                }
            } else {
                // If user exists but doesn't use email login, send error response
                res.json({
                    message_type: "error",
                    message: "User with this email already exists. If you've already registered to My Business, try another sign in method."
                });
            }
        }
    } catch (error) {
        // If any error occurs during authentication, log the error and send error response
        console.error("Error occurred while authenticating user:", error);
        res.json({
            message_type: "error",
            message: error.message
        });
    }
}

async function verifyEmail(req, res) {
    try {
        // Extract email and OTP from request body
        const { email, otp } = req.body;

        // Find user by email in the database
        const user = await UserModel.findOne({ email });

        // If user found
        if (user) {
            // Compare OTP provided by the user with stored OTP
            const compare_otp = otp === user.otp;

            // If OTP matches
            if (compare_otp) {
                // Update user status to active and clear OTP
                const query = { email: email };
                const update = { $set: { user_status: "active", otp: null } };
                const options = { new: true };

                // Update document in the database
                UserModel.findOneAndUpdate(query, update, options)
                    .then(updatedDocument => {
                        console.log('Document updated:', updatedDocument);
                        // Send success response
                        res.json({
                            message_type: "success",
                            message: "Account verified successfully."
                        });
                    })
                    .catch(err => {
                        console.error('Error updating document:', err);
                        // Send error response if update fails
                        res.json({
                            message_type: "error",
                            message: "Error updating document."
                        });
                    });
            } else {
                // Send error response if OTP doesn't match
                res.json({
                    message_type: "error",
                    message: "Incorrect OTP. Request a new OTP.",
                    email: email,
                    otp: otp
                });
            }
        } else {
            // Send error response if user not found
            res.json({
                message_type: "error",
                message: "User not found."
            });
        }
    } catch (error) {
        // If any error occurs during verification, log the error and send error response
        console.error("Error occurred while verifying user:", error);
        res.json({
            message_type: "error",
            message: error.message
        });
    }
}

async function socialSingIn(req, res) {
    try {
        // Extract name, email, social login type, and image from request body
        const { name, email, social, image } = req.body;

        // Find user by email in the database
        const user = await UserModel.findOne({ email });

        // If user doesn't exist
        if (!user) {
            // Create new user with social login
            const login_type = social;
            const user_type = "user";
            const user_status = "active";
            const profile_completed = false;

            // Save new user to the database
            const newUser = await UserModel.create({ name, email, login_type, user_type, user_status, profile_completed, image });

            // Generate JWT token for authentication
            const token = jwt.sign({ userId: email }, secretKey, { expiresIn: '6h' });

            // Send success response with token and user details
            res.json({ message_type: "success", message: "User registered successfully.", email: email, user_type: user_type, name: name, user_status: user_status, profile_completed: profile_completed, token });
        } else {
            // If user already exists
            if (user.login_type === social) {
                // Generate JWT token for authentication
                const token = jwt.sign({ userId: user.email }, secretKey, { expiresIn: '6h' });

                // Send success response with token and user details
                res.json({ message_type: "success", message: "User signed in successfully.", email: user.email, user_type: user.user_type, name: user.name, user_status: user.user_status, profile_completed: user.profile_completed, token });
            } else {
                // If user exists but with different login type, send error response
                res.json({
                    message_type: "error",
                    message: "User with this email already exists. If you've already registered to My Business, try another sign in method."
                });
            }
        }
    } catch (error) {
        // If any error occurs during social sign-in, log the error and send error response
        console.error("Error occurred while saving business details:", error);
        res.json({
            message_type: "error",
            message: error.message
        });
    }
}


async function changeName(req, res) {
    try {
        const { email, name } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            const query = { email: email };
            const update = { $set: { name: name } };
            const options = { new: true };

            // Update document in the database
            UserModel.findOneAndUpdate(query, update, options)
                .then(updatedDocument => {
                    console.log('Document updated:', updatedDocument);
                    // Send success response
                    res.json({
                        message_type: "success",
                        message: "Name updated."
                    });
                })
                .catch(err => {
                    console.error('Error updating document:', err);
                    // Send error response if update fails
                    res.json({
                        message_type: "error",
                        message: "Error updating document."
                    });
                });
        } else {
            res.json({
                message_type: "error",
                message: "User not found."
            });
        }
    } catch (error) {
        console.error("Error occurred while changing the name:", error);
        res.json({
            message_type: "error",
            message: error.message
        });
    }
}
module.exports = {
    login,
    verifyEmail,
    socialSingIn,
    changeName,
}
