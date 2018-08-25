var express = require('express');
var Coordinates = require ('../models/Coordinates');
var mlways = require ('../models/mlways');
var Waypoints = require ('../models/waypoints');

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

router.post('/maytram', async (req,res)=>{
    console.log(req.body);
    /// TODO

    let all = String(req.body.all)
    let line = all.split('\n')

    for (var i = 0; i < line.length; i++) {
        // 1	1	2	140	5
        // 2	2	3	190	6
        // 3	3	4	190	7
        // 4	4	5	210	8
        // 5	5	6	110	9
        // 6	6	7	200	10
        // 7	7	8	120	11
        // 8	8	9	110	12
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

        await mlways.update({"_id": Number(id)},
                            {
                                startWaypointID: Number(startWaypointID),
                                endWaypointID: Number(endWaypointI),
                                distant: Number(distant),
                                time: Number(time),
                            }, 
                            function(err) {
                                if (err) {
                                    mlway.save()
                                }
                            })

        // await mlways.findByIdAndUpdate(Number(id), 
        //                         {
        //                             startWaypointID: Number(startWaypointID),
        //                             endWaypointID: Number(endWaypointI),
        //                             distant: Number(distant),
        //                             time: Number(time),
        //                         },
        //                         {new: true},
        //                         (err, res) => {
        //                             if (err) {
        //                                 mlway.save()
        //                             }
        //                         })
    }

    res.json(req.body)
})

router.post('/nearby', async (req,res) => {
    var startLat = Number(req.body.start_lat)
    var startLng = Number(req.body.start_lng)

    var point = await nearestPoint(startLat,startLng)

    console.log(point)

    res.json(point)
    // await Waypoints.find({}, function(err, points) {
    //     var map = []

    //     points.forEach((point) => {
    //         var newpoint = {}
    //         newpoint.key = point
    //         let lat = Number(point.lat)
    //         let lng = Number(point.lng)
    //         newpoint.value = (startLat-lat)*(startLat-lat) + (startLng-lng)*(startLng-lng)
    //         map.push(newpoint)
    //         console.log(point)
    //     })

    //     var max = map[0]

    //     map.forEach((object) => {
    //         max = (max.value > object.value) ? object : max
    //     })

    //     //point.json
    //     res.json(max)
    // })

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

async function nearestPoint(Lat, Lng) {
    var near = {}

    await Waypoints.find({}, function(err, points) {
        var map = []

        points.forEach((point) => {
            var newpoint = {}
            newpoint.key = point
            let lat = Number(point.lat)
            let lng = Number(point.lng)
            newpoint.value = (Lat-lat)*(Lat-lat) + (Lng-lng)*(Lng-lng)
            map.push(newpoint)
            //console.log(point)
        })

        var min = map[0]

        map.forEach((object) => {
            min = (min.value > object.value) ? object : min
        })

        near = min
        console.log(min)

    })
    
    return near.key
}

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