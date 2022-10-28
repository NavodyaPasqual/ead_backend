const router =require('express').Router();
//const verify = require('./verifyToken');
const User = require('../model/User');

// Get all profiles
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (error, data) =>{
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Delete a profile
router.delete('/delete/:id', async(req, res) => {
    const id  = req.params.id
    await User.findByIdAndRemove(id).exec()
    res.status(200).json({
        success: true, msg: 'Successfully deleted'
    })
});

// Update a profile
router.put('/update/:id', async(req, res) => {
    const { slug } = req.params
    const {name,number,email,nic,password} = req.body
    User.findOneAndUpdate({slug}, {name,number,email,nic,password}, {new: true})
        .exec((err,topic) => {
            if(err) console.log(err)
            res.json(topic);
        })
});

module.exports = router;