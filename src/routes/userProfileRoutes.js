const router =require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

//Making route private with verify
router.get('/route', verify, (req, res) => {
    res.json({
        posts: {
            title: 'My fist post',
            description: "random data you shouldnt access"
        }
    })
})

// Get all profiles
router.get('/', verify, (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    User.find()
        .sort([[sortBy, order]])
        .exec((err, users) => {
            if(err) {
                return res.status(400).json ({
                    error: 'No company Payment Found'
                });
            }
            res.json(users);
        });
});

// Get a specific profile
router.get('/:id', verify, (req, res) => {
    User.findById(req.params.id, (error, data) =>{
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Delete a profile
router.delete('/delete/:id',verify, async(req, res) => {
    const id  = req.params.id
    await User.findByIdAndRemove(id).exec()
    res.send("User Deleted successfully");
});

// Update a profile
router.put('/update/:id',verify, async(req, res) => {
    const { slug } = req.params
    const {name,number,email,password} = req.body
    User.findOneAndUpdate({slug}, {name,number,email,password}, {new: true})
        .exec((err,topic) => {
            if(err) console.log(err)
            res.json(topic);
        })
});

module.exports = router;