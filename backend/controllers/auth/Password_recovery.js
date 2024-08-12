const UserModel = require('../../models/User');
const{ generateOTP , sendEmail}=require('../Commen');


async function sendRecoveryOTP(req, res) {
    try {
        // Extract email from request body
        const { email } = req.body;

        // Find user by email in the database
        const user = await UserModel.findOne({ email });

        // If user found
        if (user) {
            // Generate OTP for password recovery
            const otp = generateOTP();

            // Define update query to save OTP
            const query = { email: email };
            const update = { $set: { otp: otp } };
            const options = { new: true };

            // Update document in the database
            UserModel.findOneAndUpdate(query, update, options)
                .then(updatedDocument => {
                    // Send recovery OTP to user's email
                    sendEmail(email, "My Business Password Recovery", "Your My Business password recovery OTP: " + otp);

                    console.log('Document updated:', updatedDocument);
                    // Send success response
                    res.json({
                        message_type: "success",
                        message: "Check your email for an OTP."
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
            // Send error response if user not found
            res.json({
                message_type: "error",
                message: "User not found."
            });
        }
    } catch (error) {
        // If any error occurs during OTP sending, log the error and send error response
        console.error("Error occurred while sending recovery otp:", error);
        res.json({
            message_type: "error",
            message: error.message
        });
    }
}

async function resendOTP(req, res) {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (user) {
            const otp = generateOTP();

            // Define update query to save OTP
            const query = { email: email };
            const update = { $set: { otp: otp } };
            const options = { new: true };

            // Update document in the database
            UserModel.findOneAndUpdate(query, update, options)
                .then(updatedDocument => {
                    sendEmail(email, "My Business Password Recovery", "Your My Business password recovery OTP: " + otp);

                    console.log('Document updated:', updatedDocument);
                    // Send success response
                    res.json({
                        message_type: "success",
                        message: "We sent an OTP again. Check your email for an OTP."
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
        console.error("Error occurred while resending otp:", error);
        res.json({
            message_type: "error",
            message: error.message
        });
    }
}

async function verifyOTP(req, res) {
    try {
        // Extract email and OTP from request body
        const { email, otp } = req.body;

        // Find user by email in the database
        const user = await UserModel.findOne({ email });

        // If user found
        if (user) {
            // If OTP matches
            if (user.otp === otp) {
                // Send success response
                res.json({
                    message_type: "success",
                    message: "OTP verified. You can change your password now."
                });
            } else {
                // If OTP doesn't match, send error response
                res.json({
                    message_type: "error",
                    message: "Incorrect OTP. Request a new OTP."
                });
            }
        } else {
            // If user not found, send error response
            res.json({
                message_type: "error",
                message: "User not found."
            });
        }
    } catch (error) {
        // If any error occurs during OTP verification, log the error and send error response
        console.error("Error occurred while sending recovery otp:", error);
        res.json({
            message_type: "error",
            message: error.message
        });
    }
}


async function changePassword(req, res) {
    try {
        // Extract email and new password from request body
        const { email, password } = req.body;

        // Find user by email in the database
        const user = await UserModel.findOne({ email });

        // If user found
        if (user) {
            // Define update query to change password and clear OTP
            const query = { email: email };
            const update = { $set: { password: password, otp: null } };
            const options = { new: true };

            // Update document in the database
            UserModel.findOneAndUpdate(query, update, options)
                .then(updatedDocument => {
                    console.log('Document updated:', updatedDocument);
                    // Send success response
                    res.json({
                        message_type: "success",
                        message: "Password updated. Try logging in again."
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
            // If user not found, send error response
            res.json({
                message_type: "error",
                message: "User not found."
            });
        }
    } catch (error) {
        // If any error occurs during password change, log the error and send error response
        console.error("Error occurred while sending recovery otp:", error);
        res.json({
            message_type: "error",
            message: error.message
        });
    }
}
module.exports = {
    sendRecoveryOTP,
    verifyOTP,
    changePassword,
    resendOTP
}