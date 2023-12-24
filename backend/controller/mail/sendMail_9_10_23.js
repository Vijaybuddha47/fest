const nodemailer = require('nodemailer');

class sendMail
{
    static mail(user)
    {
        //res.send(user);
        //console.log(user.id);
        const{id, email, name} = user;
        var transporter = nodemailer.createTransport({
        port:587,
        host: "smtp.gmail.com",
        auth: {
            user: 'developer.fusioni@gmail.com',
            pass: 'tsfgtsjuyysqfvou'
        },
        secure: false,
        });

        var mailOptions = {
        from: 'developer.fusioni@gmail.com',
        to: email,
        subject: 'Film Fest - User Account Created',
        html: `<b>Hello ${name} </b><br><br><br>Your account has been created successfully and is ready to use<br/><br>Please click on <a href="http://203.161.62.204:3000/account-verified/${id}">activate account</a> to verify your email address: <strong>${email}</strong><br><br><br>Thanks <br><br>Film Fest Team`,
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        //console.log('Email sent: ' + info.response);
        }
        });
    }
}

module.exports = sendMail;