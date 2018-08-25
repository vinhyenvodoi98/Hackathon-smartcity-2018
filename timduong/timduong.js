var Graph = require('node-dijkstra');
const mlways =require ('../models/mlways');

async function createMap() {
    var map = {}
    await mlways.find({}, (err,points) => {
        points.forEach((point) => {
            let node = {}
            node[point.endWaypointID] = point.distant
            if (map[point.startWaypointID] != undefined) {
                let hih = Object.assign({}, map[point.startWaypointID], node)
                map[point.startWaypointID] = hih
            } else {
                map[point.startWaypointID] = node
            }
            
        })
        
        points.forEach((point) => {
            let node = {}
            node[point.startWaypointID] = point.distant
            if (map[point.endWaypointID] != undefined) {
                let hih = Object.assign({}, map[point.endWaypointID], node)
                map[point.endWaypointID] = hih
            } else {
                map[point.endWaypointID] = node
            }
        })

    })
    console.log(map)
    var g = new Graph(map)
    await console.log(g.path('2', '12', { cost: true }))
}

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

module.exports = nearestPoint;
module.exports = createMap;