const randomPickPoints = (width, height) => (fixedPoints) => {
  let egdePoints = [];
  let randomPoints = [];

  const edgeLength = fixedPoints.length / 4;
  // 1. 先在 width * hieght 中取點
  // 2. 如果是想要的點 push
  // 3. 如果不是，遞迴地在進行一次隨機取點
  let vertices = [];
  for (var x = 0; x < height; x++) {
    var i = x * width * 4;
    for(var y = 0; y < width; y++, i+=4) {
      if (fixedPoints[i] > 240) {
        vertices.push([x, y]);
      }
    }  
  }

  vertices.forEach(vertice => {
    if (Math.random() > 0.5 && egdePoints.length < 3000) {
      const random = Math.floor(Math.random() * vertices.length);
      const random2 = Math.floor(Math.random() * vertices.length);
      const random3 = Math.floor(Math.random() * vertices.length);
      const random4 = Math.floor(Math.random() * vertices.length);
      egdePoints.push([vertices[random][0], vertices[random][1]]);
      egdePoints.push([vertices[random2][0], vertices[random2][1]]);
      // egdePoints.push([vertices[random3][0], vertices[random3][1]]);
      // egdePoints.push([vertices[random4][0], vertices[random4][1]]);

    }
  })

  for(var i = 0; i < 1200; i++) {
    // randomPoints.push([Math.random() * height, Math.random() * width]);
    randomPoints.push([Math.random() * height, Math.random() * width]);
  }

  return egdePoints.concat(randomPoints).concat([[0,0], [0, height], [width, 0], [width, height]]);
}

export default randomPickPoints;