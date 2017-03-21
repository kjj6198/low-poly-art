const randomPickPoints = (width, height) => (fixedPoints) => {
  let egdePoints = [];
  let randomPoints = [];

  const edgeLength = fixedPoints.length
  // if sobel point > 250, be seen as edge point.
  for (var x = 0; x < width; x++) {
    var i = x * width * 4 + 4;
    for(var y = 0; y < height; y++, i+=4) {
      if (fixedPoints[i] > 240 && edgeLength < (width * height) * 4 ) {
        egdePoints.push([x, y]);
      }
    }
    randomPoints.push([Math.random() * height, Math.random() * width]);
    randomPoints.push([Math.random() * height, Math.random() * width]);
  }

  
  var length = ~~(egdePoints.length / 20);
  
  for(var i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * egdePoints.length);
    randomPoints.push(egdePoints[random]);
    egdePoints.splice(random, 1);
  }

  return egdePoints.concat(randomPoints).concat([[0,0], [0, height], [width, 0], [width, height]]);
}

export default randomPickPoints;