var express = require('express');
var Coordinates = require ('../models/Coordinates');
var mlways = require ('../models/mlways');
var Waypoints = require ('../models/waypoints');
var timduong = require('../timduong/timduong');

var router = express.Router();

router.get('/local',(req,res,next)=>{
    console.log(req)
    
    let start_lat = Number(req.query.start_lat)
    let start_lng = Number(req.query.start_lng)
    let end_lat = Number(req.query.end_lat)
    let end_lng = Number(req.query.end_lng)

    console.log(start_lat,start_lng,end_lat,end_lng)
    
    res.json({})
    
});

router.post('/local', async (req,res)=>{
    console.log(req.body);
    var abc = Array(req.body.Local.start_location);
    abc.length
    console.log(req.body.Local.start_location.length);
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

router.post('/maytram', (req,res)=>{
    console.log(req.body);
    /// TODO

    let all = String(req.body.all)
    let line = all.split('\n')

    for (var i = 0; i < line.length; i++) {
        let each = line[i].split('\t')
        let id = each[0]
        let startWaypointID = each[1]
        let endWaypointI = each[2]
        let distant = each[3]
        let time = each[4]

        //console.log(time)
        
        var mlway = new mlways({
            _id: Number(id),
            startWaypointID: Number(startWaypointID),
            endWaypointID: Number(endWaypointI),
            distant: Number(distant),
            time: Number(time),
        })
        
    }


    res.json(req.body)
})

router.post('/datawaypoint', async (req,res) => {
    //1	21.027233, 105.787644	"Unnamed RoadCầu Giấy, Hà Nội, Việt Nam"
    let all = String(req.body.all)
    let line = all.split('\"\n')

    for (var i = 0; i < line.length; i++) {
        let each = line[i].split('\t')
        let id = each[0]
        let place = each[2].replace('\"','')
        let point = each[1].split(',')
        let lat = point[0].replace('\"','')
        let lng = point[1].replace('\"','')

        await new Waypoints({
                _id: Number(id),
                place: String(place),
                lat: Number(lat),
                lng: Number(lng)
            }).save() 
    }
    
    console.log(line)

    res.json(req.body)
})

module.exports= router;

// 1	21.027233, 105.787644	"Unnamed Road
// Cầu Giấy, Hà Nội, Việt Nam"
// 3	21.024640, 105.789153	"Shop dầu tràm
// D29 Phạm Văn Bạch, Yên Hoà,"
// 2	21.026233, 105.788228	"Unnamed Road
// Yên Hoà, Cầu Giấy, Hà Nội, Việt Na"
// 4	21.023266, 105.790010	"Dương Đình Nghệ
// Yên Hoà, Cầu Giấy, Hà Nội, Việt Na"
// 5	21.021621, 105.791132	"Công Ty Cổ Phần NaBo Việt Nam
// 210 Trung Kính, Cầu Giấy, Yên Hoà"