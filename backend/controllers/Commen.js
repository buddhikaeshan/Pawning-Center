const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kaviyax123@gmail.com',
        pass: 'yiobpdvtcrsisuei'
    }
});

async function sendEmail(to, subject, text) {
    try {
        // Construct the email message
        const mailOptions = {
            from: 'kaviyax123@gmail.com',
            to: to,
            subject: subject,
            text: text
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = {
    sendEmail
}