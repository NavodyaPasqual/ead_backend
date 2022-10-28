const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("config");
const { registrationValidation, loginValidation } = require('../validator/validation');

//REGISTRATION
router.post('/register', async (req, res) => {
    const { name, email, nic, number, password } = req.body;

    try {
        //See if user Exist
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exist" }] });
        }

        //create a Site User instance
        user = new User({
            name,
            email,
            nic, 
            number, 
            password,
        });

        //Encrypt Password

        //10 is enogh..if you want more secured.user a value more than 10
        const salt = await bcrypt.genSalt(10);

        //hashing password
        user.password = await bcrypt.hash(password, salt);

        //Return jsonwebtoken
        const payload = {
            user: {
                email: user.email,
            },
        };

        jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                //save user to the database
                user.token = token;
                return user
                    .save()
                    .then((registeredUser) => {
                        return res.json(registeredUser);
                    })
                    .catch((error) => {
                        return res.json(error);
                    });
            }
        );
    } catch (err) {
        //Something wrong with the server
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

  try {
    //See if user Exist
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //match the user email and password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    } else {
      return res.json(user);
    }
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
module.exports = router;