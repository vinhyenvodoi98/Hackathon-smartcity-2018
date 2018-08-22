var express = require('express');
var Coordinates = require ('../models/Coordinates');
var router = express.Router();

router.get('/local',(req,res,next)=>{
    res.json({ title: 'yolo duoc roi :v' })
});

router.post('/local', async (req,res)=>{
    console.log(req.body);
    await new Coordinates({
        start_lat : req.body.Local.start_location[0].lat,
        start_lng : req.body.Local.start_location[0].lng,
        end_lat : req.body.Local.end_location[0].lat,
        end_lng : req.body.Local.end_location[0].lng,
    }).save();
        if(error) throw error;
        res.json(req.body);
});

router.get('/maytram',(req,res)=>{
    res.json({title : 'tim cach ket noi nhe'});
})

router.post('/maytram',async (req,res)=>{
    console.log(req.body);
    ///
    res.json(req.body)
})

module.exports= router;