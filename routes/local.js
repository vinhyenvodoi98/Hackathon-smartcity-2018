var express = require('express');
var Coordinates = require ('../models/Coordinates');
var router = express.Router();

router.get('/local',(req,res,next)=>{
    res.json({ title: 'yolo duoc roi :v' })
});

router.post('/local', async (req,res,next)=>{
    console.log(req.body);
    
      res.json(req.body);
});

module.exports= router;