const router =require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const {registrationValidation, loginValidation} = require('../validator/validation');

//REGISTRATION
router.post('/register', async(req, res) => {
    // Validating the data
    const {error} = registrationValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking email already exist
    const emailExist = await User.findOne({
        email: req.body.email
    })
    if(emailExist) {
        return res.status(400).send('Email already exist');
    }

    //Hash pw
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Creating a new user
    const user = new User({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch (err) {
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async(req, res) => {
    // Validating the data
    const {error} = loginValidation(req.body);
    if(error) 
        return res.status(400).send(error.details[0].message);
    
    //Checking email already exist
    const user = await User.findOne({
        email: req.body.email
    })
    if(!user) {
        return res.status(400).send('Email is not found');
    }

    //Checking pw is correct
    const validPW = await bcrypt.compare(req.body.password, user.password);
    if(!validPW) {
        return res.status(400).send('Invalid password');
    }

    //Creating and asigning JWT web token
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});
module.exports = router;