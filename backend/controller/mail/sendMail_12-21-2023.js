const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const { FRONTEND_URL } = require('../../config/index')
class sendMail {
    static mail(user) {
        //res.send(user);
        //console.log(user.id);
        const { id, email, name } = user;
        var transporter = nodemailer.createTransport({
            port: 587,
            host: "smtp.googlemail.com",
            auth: {
                user: 'developer.fusioni@gmail.com',
                pass: 'opxvbxonrddriush'
            },
            secure: false,
        });

        var mailOptions = {
            from: 'Filmfest <admin@filmfest.net>',
            to: email,
            subject: 'Activate Your Filmfest Account Now!',
            html: `<b> Hello ${name} </b><br><br><br>Welcome to Filmfest! Just one step more - click the button bellow to confirm your email and enter the festival.<br/><br><a style="color:#FFF; font-size: 20px; width: 200px; height:60px; text-decoration: none;background-color:#ca29f2;padding:5px;margin-left: 20%;font-weight:800;border-radius:3px;" href="${FRONTEND_URL}/account-verified/${id}">Activate Account</a><br><br><br>Thanks,<br><br>Filmfest`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                // console.log('Email sent: ' + info.response);
            }
        });
    }

    static resetmail(user) {
        //res.send(user);
        // console.log(user.id);
        const { id, email, name } = user;

        //const hashedPassword = await bcrypt.hash(password, 10);

        var transporter = nodemailer.createTransport({
            port: 587,
            host: "smtp.googlemail.com",
            auth: {
                user: 'developer.fusioni@gmail.com',
                pass: 'opxvbxonrddriush'
            },
            secure: false,
        });

        var mailOptions = {
            from: 'Filmfest <admin@filmfest.net>',
            to: email,
            subject: 'Reset Filmfest Account Password Link',
            html: `<b> Hello ${name} </b><br><br><br>You requested to reset your password - click the button bellow to rest the password.<br/><br><a style="color:#FFF; font-size: 20px; width: 200px; height:60px; text-decoration: none;background-color:#ca29f2;padding:5px;margin-left: 20%;font-weight:800;border-radius:3px;" href="${FRONTEND_URL}/reset-password/${id}">Reset Password</a><br><br><br>Thanks,<br><br>Filmfest`,
            // html: `<b>Hi ${name} </b><br><br><br>You requested to reset your password<br/><br>Please click on <a href="http://203.161.62.204:3000/reset-password/${id}">Reset Password</a> to reset your password<br><br><br>Thanks <br><br>Film Fest Team`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                //console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = sendMail;