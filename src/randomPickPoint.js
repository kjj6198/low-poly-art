const randomPickPoints = (width, height) => (fixedPoints) => {
  let egdePoints = [];
  let randomPoints = [];
  const edgeLength = fixedPoints.length / 4;
  let vertices = [];
  for (var x = 0; x < width; x++) {
    var i = x * width * 4;
    for(var y = 0; y < height; y++, i+=4) {
      if (fixedPoints[i] >= 240) {
        vertices.push([x, y]);
      }
    }  
  }

  vertices.forEach(vertice => {
    if (Math.random() > 0.5 && egdePoints.length < 300) {
      const random = Math.floor(Math.random() * vertices.length);
      const random2 = Math.floor(Math.random() * vertices.length);
      const random3 = Math.floor(Math.random() * vertices.length);
      const random4 = Math.floor(Math.random() * vertices.length);
      egdePoints.push([vertices[random][0], vertices[random][1]]);
      egdePoints.push([vertices[random2][0], vertices[random2][1]]);
      egdePoints.push([vertices[random3][0], vertices[random3][1]]);
      // egdePoints.push([vertices[random4][0], vertices[random4][1]]);
    }
  })

  for(var i = 0; i < 600; i++) {
    // randomPoints.push([Math.random() * height, Math.random() * width]);
    randomPoints.push([Math.random() * width, Math.random() * height]);
  }

  return egdePoints.concat(randomPoints).concat([[0,0], [0, height], [width, 0], [width, height]]);
}

export default randomPickPoints;