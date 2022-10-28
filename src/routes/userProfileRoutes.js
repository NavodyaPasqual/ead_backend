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

    try {
        let updateUser = await User.findById(req.params.id);
        if(!updateUser) {
            return res.status(400).json({
                success: false, msg: 'User does not exit'
            });
        }
        updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({success: true, msg: 'Successfully updated'});
    } catch (error) {
        next(error);
    }
});

module.exports = router;