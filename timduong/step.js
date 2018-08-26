var Waypoints = require ('../models/waypoints');

async function routeJson(source) {

    //console.log(source);
    let allPoint = {}
    let path = source.path
    
    path.forEach(async(id) => {
        console.log(id);
        var res = await Waypoints.findById(Number(id));
        allPoint[id] = {
            lat : res.lat ,
            lng : res.lng
        }
    })

    allPoint = { '6': { lat: 21.020729, lng: 105.791691 },
    '7': { lat: 21.019071, lng: 105.792605 },
    '8': { lat: 21.01816, lng: 105.793259 },
    '9': { lat: 21.017193, lng: 105.793667 },
    '11': { lat: 21.02442, lng: 105.791784 },
    '12': { lat: 21.02232, lng: 105.791954 },
    '13': { lat: 21.020728, lng: 105.792201 },
    '22': { lat: 21.023571, lng: 105.793312 } }

    return allPoint;
   //console.log(allPoint2);
    
}


module.exports = routeJson;