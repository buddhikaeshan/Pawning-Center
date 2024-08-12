const UserModel = require('../../models/User');
const{sendEmail}=require('../Commen');


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
    changePassword,
}