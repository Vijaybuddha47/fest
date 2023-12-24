const Joi = require("joi");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const UserDTO = require("../dto/user");
const sendMail = require('./mail/sendMail');

registerController = {

    //Registration
    async register(req, res, next){
        // res.send(req.body)
        // console.log(req.body);

        const userRegisterSchema = Joi.object({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(30).required(),
            confirmPassword: Joi.ref("password"),
        });
        const{ error } = userRegisterSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        // if email is already registerd
        const {name, email, password} = req.body;

        try{
            const emailInUse = await User.exists({ email });

            if(emailInUse)
            {
                const error = {
                    status: 409,
                    message: "Email is already used,use another email",
                };

                return next(error);
            }
        }
        catch(error)
        {
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let user;

        try{
            const userToRegister = new User({
                name,
                email,
                password: hashedPassword,
                status: 'I',
                user_type: 'U',
            })

            user = await userToRegister.save();
        }
        catch(error)
        {
            return next(error);
        }

        sendMail.mail(user);
        const userddata = new UserDTO(user);
        return res.status(201).json({ userddata });
    },

    //login
    async login(req, res, next){
        //res.send(req.body);
     
        const userLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(30).required(),
        })

        const{ error } = userLoginSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const{email ,password} = req.body;

        let checkmail;
        try{
            checkmail = await User.findOne({email:email,status:'A'});

            if(!checkmail)
            {
                const error = {
                    status: 401,
                    message: "Invalid Email Id"
                }

                return next(error);
            }

            //Match Password
            const match = await bcrypt.compare(password, checkmail.password);

            if(!match)
            {
                const error = {
                    status: 401,
                    message: "Invailid Password"
                }

                return next(error);
            }
        }
        catch(error)
        {
            return next(error);
        }
        const userDto = new UserDTO(checkmail);
        let message = "login Successfully"

        return res.status(200).json({ user: userDto,message:message});
    },
    async adminLogin(req, res, next){
        //res.send(req.body);
     
        const userLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(30).required(),
        })

        const{ error } = userLoginSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const{email ,password} = req.body;

        let checkmail;
        try{
            checkmail = await User.findOne({email:email,user_type:'A',status:'A'});

            if(!checkmail)
            {
                const error = {
                    status: 401,
                    message: "Invalid Email Id"
                }

                return next(error);
            }

            //Match Password
            const match = await bcrypt.compare(password, checkmail.password);

            if(!match)
            {
                const error = {
                    status: 401,
                    message: "Invailid Password"
                }

                return next(error);
            }
        }
        catch(error)
        {
            return next(error);
        }
        const userDto = new UserDTO(checkmail);
        let message = "login Successfully"

        return res.status(200).json({ user: userDto,message:message});
    },
    async updateUser(req, res, next)
    {
        const updateSchema = Joi.object({
            name: Joi.string().required(),
            id: Joi.string().required(),
            status:Joi.string().allow('')
        });

        const { error } = updateSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const {name,status, id} = req.body;

        try{

            const validateId = await User.findById({_id: id});

            if(!validateId)
            {
                return res.status(400).json({message: "Invalid Id"});
            }
            
            const updateStatus = await User.updateOne({_id: id},
                {
                    name,
                    status
                });
                
        }
        catch(error)
        {
            return next(error);
        }
        const getUser = await User.findById({_id: id});
        const userddata = new UserDTO(getUser);
        return res.status(200).json({userddata,message: "Updated Successfully"});
    },

    async updatePassword(req, res, next)
    {
        const userLoginSchema = Joi.object({
            id: Joi.string().required(),
            current_password:Joi.string().required(),
            new_password: Joi.string().min(8).max(30).required(),
            confirmPassword: Joi.ref("new_password")
        });

        const{ error } = userLoginSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const {current_password, new_password, id} = req.body;

        const hashedPassword = await bcrypt.hash(new_password, 10);
        //const hashcurrentPass = await bcrypt.hash(current_password, 10);

        try{

            const validateUser = await User.findById({_id: id});

            if(!validateUser)
            {
                return res.status(400).json({message: "Invalid User"});
            }

            const match = await bcrypt.compare(current_password,validateUser.password);
            if(match)
            {
                const updateStatus = await User.updateOne({_id: id},
                    {
                        password:hashedPassword
                    });
                return res.status(200).json({message: "Password Updated Successfully"});
            }
            else
            {
                //console.log(validateUser.password,hashcurrentPass);
                return res.status(401).json({message: "Password not Match"});
            }
            
        }
        catch(error)
        {
            return next(error);
        }
        
    },

    async Alluser(req, res, next)
    {
        try{
            const userData = await User.find({user_type:'U'});
          
            //FilmmakerDTO
            //const filmmakerdto = new FilmmakerDTO(filmmakers);
            const users = [];

            for (let i = 0; i < userData.length; i++) {
              const dto = new UserDTO(userData[i]);
              users.push(dto);
            } 

            if(users)
            {
                return res.status(200).json({users});
            }
            else
            {
                return res.status(404).json({users})
            }
            

        }
        catch(error)
        {
            return next(error);
        }
    },
    async getUserById(req, res, next)
    {
        const getSchema = Joi.object({
            id: Joi.string().required(),
        });

        const {error} = getSchema.validate(req.params);

        if(error)
        {
            return next(error);
        }

        const {id} = req.params;

        try{
            const userData = await User.findById({_id: id});
            
            const users = new UserDTO(userData);
          
            if(!users)
            {
                return res.status(404).json({message: "User Not Exist"});
            }
            else
            {
                return res.status(200).json({users});
            }
        }
        catch(error)
        {
            return next(error);
        }
    }


}

module.exports = registerController;