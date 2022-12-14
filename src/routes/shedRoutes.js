const router =require('express').Router();
const Shed = require('../model/Shed');

//Shed registration
router.post('/register', async(req, res) => {
    if(req.body) {
        const shed = new Shed(req.body);
        await shed.save()
            .then(data=>{
                res.status(200).send({data: data});
            })
            .catch(error =>{
                res.status(500).send({error: error.message});
            });
    }
}); 

//get all sheds
router.get('/', (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    Shed.find()
        .sort([[sortBy, order]])
        .exec((err, shed) => {
            if(err) {
                return res.status(400).json ({
                    error: 'No data Found'
                });
            }
            res.json(shed);
        });
});

//get specific shed
router.get('/:id', async(req, res) => {
    Shed.findById(req.params.id, (error, data) =>{
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//update fuel
router.put('/update/:id', async(req, res) => {
    const { slug } = req.params
    const {dieselArrivalTime,dieselAvailable,dieselFinishTime,petrolArrivalTime,petrolAvailable,petrolFinishTime} = req.body
    Shed.findOneAndUpdate({slug}, {dieselArrivalTime,dieselAvailable,dieselFinishTime, petrolArrivalTime,petrolAvailable,petrolFinishTime}, {new: true})
        .exec((err,shed) => {
            if(err) console.log(err)
            res.status(200).json({success: true, msg: 'Successfully updated'});
        })
});


//update petrol
/*router.put('/update/:id', async(req, res) => {
    const { slug } = req.params
    const {regNo,name,address,shedContactNo,dieselArrivalTime,dieselAvailable,dieselFinishTime,petrolArrivalTime,petrolAvailable,petrolFinishTime} = req.body
    Shed.findOneAndUpdate({slug}, {regNo,name,address,shedContactNo,petrolArrivalTime,petrolAvailable,petrolFinishTime}, {new: true})
        .exec((err,shed) => {
            if(err) console.log(err)
            res.json(shed);
        })
});*/

//delete specific shed 
router.delete('/delete/:id', async(req, res) => {
    const id  = req.params.id
    await Shed.findByIdAndRemove(id).exec()
    res.status(200).json({
        success: true, msg: 'Successfully deleted'
    })
});

module.exports = router;