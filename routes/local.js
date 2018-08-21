var express = require('express');
var Coordinates = require ('../models/Coordinates');
var router = express.Router();

router.get('/local',(req,res,next)=>{
    res.json({ title: 'yolo duoc roi :v' })
});

router.post('/local', async (req,res,next)=>{
    console.log(req.body.Local.start_location);
    await new Coordinates({
        start_lat : req.body.Local.start_location.lat,
        start_lng : req.body.Local.start_location.lng,
        end_lat : req.body.Local.end_location.lat,
        end_lng : req.body.Local.end_location.lng,
    }).save(); 
     res.json(req.body);
});

module.exports= router;