const router =require('express').Router();
const Queue = require('../model/Queue');

//Queue create
router.post('/create', async(req, res) => {
    if(req.body) {
        const queue = new Queue(req.body);
        await queue.save()
            .then(data=>{
                res.status(200).send({data: data});
            })
            .catch(error =>{
                res.status(500).send({error: error.message});
            });
    }
}); 

//get all queue
router.get('/', (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    Queue.find()
        .sort([[sortBy, order]])
        .exec((err, queue) => {
            if(err) {
                return res.status(400).json ({
                    error: 'No data Found'
                });
            }
            res.json(queue);
        });
});

//get specific queue
router.get('/specific/:id', async(req, res) => {
    Queue.findById(req.params.id, (error, data) =>{
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//update specific queue
router.put('/update/:id', async(req, res) => {
    const { slug } = req.params
    const {id,nic,fuelStation,status} = req.body
    Queue.findOneAndUpdate({slug}, {id,nic,fuelStation,status}, {new: true})
        .exec((err,queue) => {
            if(err) console.log(err)
            res.json(queue);
        })
});

//update specific queue status
router.put('/update-status/:id', async (req, res) => {
    const id = req.params.id;
    const {status} = req.body;
    const updateStatus = {
        status
    }
    const update = await Queue.findByIdAndUpdate(id, updateStatus)
        .then(() => {
            res.status(200).send({status: status})
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: " Error", error:err.message});
        })
});

//delete specific queue 
router.delete('/delete/:id', async(req, res) => {
    const id  = req.params.id
    await Queue.findByIdAndRemove(id).exec()
    res.send("Deleted");
});

// count of joined vehicals
router.get('/vehical-count', async (req, res) => {
    Queue.countDocuments({ status: "Joined" }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});
module.exports = router;