var mlways = require ('../models/mlways');
var Waypoints = require ('../models/waypoints');

async function Jams(){
    var ratio ;
    let a = await mlways.find({ratio : {$lt: 0.3}});
    //console.log(a[0].startWaypointID);
    let b = await Waypoints.find({_id: a[0].startWaypointID});
    let c = await Waypoints.find({_id: a[0].endWaypointID});
    // console.log(b);
    // console.log(c);

    var x = a.map((point) => {
        return {
            start_location: {
                lat : b[0].lat,
                lng : b[0].lng
            },              
            end_location: {
                lat : c[0].lat,
                lng : c[0].lng
            }
        }
    })

    return x;
}

module.exports = Jams;