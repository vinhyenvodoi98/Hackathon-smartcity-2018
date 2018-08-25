var Graph =require ('node-dijkstra');

async function timduong() {
    
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

module.exports =timduong;
