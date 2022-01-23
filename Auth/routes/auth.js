const router = require('express').Router(); 
const User = require('../model/User');
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken'); 


//Validation for register 
const Joi = require('@hapi/joi'); 
const schemaRegister = Joi.object({ //schema for validation 
    name: Joi.string().min(6).required(), 
    email: Joi.string().min(6).required().email(), 
    password: Joi.string().min(6).required(), 
    confirm_password: Joi.string().required()
}); 

//register
router.post('/register', async (req, res) => { 
    //validate user
    console.log(req.body); 
    const {error} = schemaRegister.validate(req.body); //sends an object with the validation
    if(error) { 
        console.log(error.details[0].message); 
        return res.status(400).send(error.details[0].message); //code to retrieve the error message from the validation
    } 
    
    //checking if the user is in the database
    const emailExist = await User.findOne({email: req.body.email}); //.findOne is a built in function in Mongoose
    if(emailExist) { 
        console.log('Email already exists.'); 
        return res.status(400).send('Email already exists.'); 
    } 
    
    const name = req.body.name; 
    const email = req.body.email; 
    const password = req.body.password; 
    const confirmPassword = req.body.confirm_password; 

    if(password === confirmPassword) { 
        //hash the password
        const salt = await bcrypt.genSalt(10); //generate a salt 
        const hashPassword = await bcrypt.hash(password, salt); //hash password using bcrypt and salt
    
        const user = new User({
            name, 
            email, 
            password: hashPassword,
        }); 
        try { 
            const savedUser = await user.save(); 
            console.log(savedUser.name + " is added to the database"); 
        } catch(err) { 
            res.status(400).send(err); 
        }
    } else { 
        console.log('Passwords do not match'); 
        return res.status(400).send('Passwords do not match'); 
    }
}); 

const schemaLogin = Joi.object({ //schema for validation - login 
    email: Joi.string().min(6).required().email(), 
    password: Joi.string().min(6).required()
}); 

//login
router.post('/login', async (req, res) => { 
    const {error} = schemaLogin.validate(req.body); //sends an object with the validation
    if(error) { 
        console.log('Email or password is incorrect'); 
        return res.status(400).send(error.details[0].message); //code to retrieve the error message from the validation
    } 
    
    //checking if the user is in the database
    const user = await User.findOne({email: req.body.email}); //.findOne is a built in function in Mongoose
    if(!user) { 
        console.log('Email is not found.'); 
        return res.status(400).send('Email is not found.');
    } 
        
    //if password is correct 
    const validPassword = await bcrypt.compare(req.body.password, user.password); //compare hashed password using bcrypt
    if(!validPassword) { 
        console.log('Password is incorrect'); 
        return res.status(400).send('Password is incorrect'); 
    } 
        
    
    //json web tokens - create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_PASSWORD); 
    res.header('auth-token', token).send(token); //sending token to the header called 'auth-token'
    //res.send('Successfully logged in!'); 
    console.log('Sucessfully logged in for ' + user.email); 

}); 

const schemaUpdatePassword = Joi.object({ //schema for validation - login 
    email: Joi.string().min(6).required().email(), 
    password: Joi.string().min(6).required(), 
    newPassword: Joi.string().min(6).required(), 
}); 

router.post('/updatePassword', async (req, res) => { 
    const {error} = schemaUpdatePassword.validate(req.body); //sends an object with the validation
    if(error) { 
        console.log(error.details[0].message); 
        return res.status(400).send(error.details[0].message); //code to retrieve the error message from the validation
    } 

    //checking if the user is in the database
    const user = await User.findOne({email: req.body.email}); //.findOne is a built in function in Mongoose
    if(!user) { 
        console.log('Email is not found.'); 
        return res.status(400).send('Email is not found.');
    } 

    const validPassword = await bcrypt.compare(req.body.password, user.password); //compare hashed password using bcrypt
    if(!validPassword) { 
        console.log('Password is incorrect'); 
        return res.status(400).send('Password is incorrect'); 
    } 

    const salt = await bcrypt.genSalt(10); //generate a salt 
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt); //hash password using bcrypt and salt

    try { 
        const updated = await User.updateOne({email: req.body.email}, {password: hashPassword}); 
        const userTemp = await User.findOne({email: req.body.email}); 
        console.log(userTemp); 
        console.log("Password Updated"); 
    } catch(err) { 
        return res.status(400).send(err); 
    }

}); 

router.post('/reset-password', async(req, res) => { 
    console.log('reset password page is setup'); 
}); 


module.exports = router; 