const Graph = require('node-dijkstra');
const mlways = require ('../models/mlways');
//const graph = new Graph();

async function createMap(idstart,idend) {
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
    //console.log(map)
    var graph = new Graph(map)
    var kq= graph.path(String(idstart), String(idend), { cost: true })
    //console.log(graph.path(String(idstart), String(idend), { cost: true }));
    return kq;
    // kq.path.forEach((id)=>{
    //     console.log(id);
    // })
}

// async function findway() {
//     console.log(graph.path('2', '12', { cost: true }))
// }

module.exports = createMap;
// module.exports = findway;