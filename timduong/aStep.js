function stepJson (allPoint,source){  
    path=source.path;

    let step = []

    for (var i = 1 ; i < path.length; i++) {
        let aStep = {}
        aStep.start_location.lat = allPoint[path[i-1]].lat
        aStep.start_location.lng = allPoint[path[i-1]].lng
        aStep.end_location.lat = allPoint[path[i]].lat
        aStep.end_location.lng = allPoint[path[i]].lng
        step.push(aStep)
    }

    let responce = {}
    responce.Instruct.step = step

    console.log(responce);
    return responce;
}

module.exports = stepJson;