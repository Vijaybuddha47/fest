const Joi = require("joi");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const UserDTO = require("../dto/user");
const sendMail = require('./mail/sendMail');
const multer = require('multer');
const aws = require('aws-sdk');


registerController = {

    //Registration
    async register(req, res, next) {
        // console.log(req.body);

        const userRegisterSchema = Joi.object({
            name: Joi.string().min(1).max(50).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(30).required(),
            confirmPassword: Joi.ref("password"),
        });

        const { error } = userRegisterSchema.validate(req.body);
        if (error) return res.status(400).json({ status: 0, message: error.message, user: [] });

        // if email is already registerd
        const { name, email, password } = req.body;

        try {
            const emailInUse = await User.exists({ email });
            if (emailInUse) return res.status(400).json({ status: 0, message: 'Email is already used, Please register with another email', user: [] });

        }
        catch (error) {
            return res.status(400).json({ status: 0, message: error.message, user: [] });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let user;

        try {
            const userToRegister = new User({
                name,
                email,
                password: hashedPassword,
                status: 'I',
                user_type: 'U',
            })

            user = await userToRegister.save();
        }
        catch (error) {
            return res.status(400).json({ status: 0, message: error.message, user: [] });
            // return next(error);
        }

        sendMail.mail(user);
        const userData = new UserDTO(user);
        return res.status(200).json({ status: 1, message: "Signup successfully.", user: userData });
    },

    //login
    async login(req, res, next) {
        // console.log(req.body);

        const userLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(30).required(),
        })

        const { error } = userLoginSchema.validate(req.body);
        if (error) return res.status(400).json({ status: 0, message: error.message, user: [] });

        const { email, password } = req.body;

        let checkmail;
        try {
            checkmail = await User.findOne({ email: email });

            if (!checkmail) return res.status(400).json({ status: 0, message: "Email is not in use. Please sign up.", user: [] });

            if (checkmail.status != 'A') return res.status(400).json({ status: 0, message: "Check your email to verify and activate your account.", user: [] });

            //Match Password
            const match = await bcrypt.compare(password, checkmail.password);
            if (!match) return res.status(400).json({ status: 0, message: "Invailid Password. Please try again.", user: [] });

        }
        catch (error) {
            return res.status(400).json({ status: 0, message: error.message, user: [] });
        }

        const userDto = new UserDTO(checkmail);
        return res.status(200).json({ status: 1, message: "Login successfully", user: userDto });
    },
    async adminLogin(req, res, next) {
        //res.send(req.body);

        const userLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(30).required(),
        })

        const { error } = userLoginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { email, password } = req.body;

        let checkmail;
        try {
            checkmail = await User.findOne({ email: email, user_type: 'A', status: 'A' });

            if (!checkmail) {
                const error = {
                    status: 401,
                    message: "Invalid Email Id"
                }

                return next(error);
            }

            //Match Password
            const match = await bcrypt.compare(password, checkmail.password);

            if (!match) {
                const error = {
                    status: 401,
                    message: "Invailid Password"
                }

                return next(error);
            }
        }
        catch (error) {
            return next(error);
        }
        const userDto = new UserDTO(checkmail);
        let message = "login Successfully"

        return res.status(200).json({ user: userDto, message: message });
    },
    async updateUser(req, res, next) {
        const updateSchema = Joi.object({
            name: Joi.string().required(),
            id: Joi.string().required(),
            status: Joi.string().allow('')
        });

        const { error } = updateSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { name, status, id } = req.body;

        try {

            const validateId = await User.findById({ _id: id });

            if (!validateId) {
                return res.status(400).json({ message: "Invalid Id" });
            }

            const updateStatus = await User.updateOne({ _id: id },
                {
                    name,
                    status
                });

        }
        catch (error) {
            return next(error);
        }
        const getUser = await User.findById({ _id: id });
        const userddata = new UserDTO(getUser);
        return res.status(200).json({ userddata, message: "Updated Successfully" });
    },

    async updatePassword(req, res, next) {

        const userLoginSchema = Joi.object({
            id: Joi.string().required(),
            current_password: Joi.string().required(),
            new_password: Joi.string().min(8).max(30).required(),
            confirm_password: Joi.ref("new_password")
        });

        const { error } = userLoginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { id, current_password, new_password } = req.body;

        const hashedPassword = await bcrypt.hash(new_password, 10);
        //const hashcurrentPass = await bcrypt.hash(current_password, 10);

        try {

            const validateUser = await User.findById({ _id: id });

            if (!validateUser) {
                return res.status(400).json({ message: "Invalid User" });
            }

            const match = await bcrypt.compare(current_password, validateUser.password);
            if (match) {
                const updateStatus = await User.updateOne({ _id: id },
                    {
                        password: hashedPassword
                    });
                return res.status(200).json({ message: "Password Updated Successfully" });
            }
            else {
                //console.log(validateUser.password,hashcurrentPass);
                return res.status(401).json({ message: "Password not Match" });
            }

        }
        catch (error) {
            return next(error);
        }

    },

    async Alluser(req, res, next) {
        try {
            const userData = await User.find({ user_type: 'U' });

            //FilmmakerDTO
            //const filmmakerdto = new FilmmakerDTO(filmmakers);
            const users = [];

            for (let i = 0; i < userData.length; i++) {
                const dto = new UserDTO(userData[i]);
                users.push(dto);
            }

            if (users) {
                return res.status(200).json({ users });
            }
            else {
                return res.status(404).json({ users })
            }


        }
        catch (error) {
            return next(error);
        }
    },
    async getUserById(req, res, next) {
        const getSchema = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = getSchema.validate(req.params);

        if (error) {
            return next(error);
        }

        const { id } = req.params;

        try {
            const userData = await User.findById({ _id: id });

            const users = new UserDTO(userData);

            if (!users) {
                return res.status(404).json({ message: "User Not Exist" });
            }
            else {
                return res.status(200).json({ users });
            }
        }
        catch (error) {
            return next(error);
        }
    },
    async verifyUser(req, res, next) {
        // console.log(req.body);
        const getSchema = Joi.object({
            id: Joi.string().length(24).required(),
        });

        const { error } = getSchema.validate(req.body);
        if (error) return res.status(400).json({ status: 0, message: error.message });

        const { id } = req.body;

        try {
            const validateUser = await User.findById({ _id: id });
            if (!validateUser) return res.status(400).json({ status: 0, message: "Invalid User" });

            if (validateUser.status == 'A') return res.status(200).json({ status: 1, message: "VERIFIED" });

            const updateStatus = await User.updateOne({ _id: id },
                {
                    status: 'A'
                });

            return res.status(200).json({ status: 1, message: "Activated successfully" });
        }
        catch (error) {
            return res.status(400).json({ status: 0, message: error.message });
        }

    },
    async resetPassword(req, res, next) {
        const getSchema = Joi.object({
            email: Joi.string().email().required(),
        });

        const { error } = getSchema.validate(req.body);

        if (error) {
            return next(error)
        }

        const { email } = req.body;
        let checkmail

        try {
            checkmail = await User.findOne({ email: email, user_type: 'U' });

            if (!checkmail) {
                const error = {
                    status: 401,
                    message: "Invalid Email Id"
                }

                return next(error);
            }
            else {
                sendMail.resetmail(checkmail);
                return res.status(200).json({ message: 'We have e-mailed your password reset link!' });
            }
        }
        catch (error) {
            return (next(error))
        }


    },
    async forgotPassword(req, res, next) {
        const getSchema = Joi.object({
            id: Joi.string().required(),
            password: Joi.string().min(8).max(30).required(),
            confirm_password: Joi.ref("password")
        });

        // console.log(req.body);

        const { error } = getSchema.validate(req.body);
        if (error) {
            return next(error)
        }

        const { id, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        let checkmail

        try {
            checkmail = await User.findOne({ _id: id });

            if (!checkmail) {
                const error = {
                    status: 401,
                    message: "Invalid User"
                }

                return next(error);
            }
            else {

                const updateStatus = await User.updateOne({ _id: id },
                    {
                        password: hashedPassword
                    });
                return res.status(200).json({ status: 1, message: "Password updated successfully." });
            }
        }
        catch (error) {
            return (next(error))
        }


    },
    async removeUser(req, res, next) {
        const deleteSchema = Joi.object({
            id: Joi.string().required(),
        });

        // console.log(req.body);
        // console.log(req.params);
        const { error } = deleteSchema.validate(req.params);

        if (error) {
            return next(error);
        }

        const { id } = req.params;

        try {
            const deleteData = await User.deleteOne({ _id: id });

            const { deletedCount } = deleteData;

            if (!deletedCount) {
                return res.status(404).json({ message: "Director Not Exist" });
            }
        }
        catch (error) {
            return next(error);
        }

        return res.status(200).json({ message: "Deleted Successfully" });

    },

    async updateUserProfile(req, res, next) {
        const { user_id } = req.body;

        const profileSchema = Joi.object({
            image: Joi.string().allow(''),
            user_id: Joi.string().required().messages({
                'string.empty': `User is not allowed to be empty.`,
                'any.required': `user_id is required field.`,
            })
        });

        const { error } = profileSchema.validate(req.body);
        if (error) return res.status(400).json({ status: 0, message: error.message, data: [] });

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });

        try {
            const userData = await User.findById({ _id: user_id });
        } catch (error) {
            return res.status(400).json({ status: 0, message: error.message, data: [] });
        }

        let image;
        if (req.file !== undefined) {
            try {
                image = Date.now() + '-' + req.file.originalname.split(" ").join("");
                const s3 = new aws.S3({
                    credentials: {
                        accessKeyId: 'AKIAR6ITYLIGB5BKCG2A',
                        secretAccessKey: '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',
                    },
                    region: 'us-east-1',
                    useAccelerateEndpoint: true,

                });

                const params = {
                    Bucket: 'bdm-flimfest-dev',
                    Key: `${image}`, // Object key in S3
                    Body: req.file.buffer, // File buffer to be uploaded
                };

                // Upload the file to S3
                s3.upload(params, (err, data) => {
                    if (err) return res.status(500).json({ status: 0, message: error.message, data: [] });
                });

                const userData = await User.findById({ _id: user_id });

                if (userData.image !== '') {

                    const deleteParams = {
                        Bucket: 'bdm-flimfest-dev',
                        Key: userData.image,
                    };

                    s3.deleteObject(deleteParams, (err, data) => {
                        if (err) {
                            console.error('Error deleting file from S3:', err);
                        } else {
                            console.log('File deleted successfully');
                        }
                    });
                }

                const updateData = await User.updateOne({ _id: user_id }, { image });
                const updatedData = await User.findById({ _id: user_id });
                const users = new UserDTO(updatedData);

                return res.status(200).json({ status: 1, message: "Updated Successfully", data: users });

            }
            catch (error) {
                return res.status(400).json({ status: 0, message: error.message, data: [] });
            }
        } else return res.status(400).json({ status: 0, message: "image file is required.", data: [] });

    },


}

module.exports = registerController;