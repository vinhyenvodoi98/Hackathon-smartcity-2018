// const mlways = require ('../models/mlways');
const Waypoints = require ('../models/waypoints');
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
        //console.log(near.key._id)

    })
    
    return near.key._id;
}

module.exports = nearestPoint;