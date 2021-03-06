const makeLowPoly = (points, triangles) => (ctx, imageData) => {
  let colors = [];
  let vertices = [];

  ctx.canvas.width = imageData.width;
  ctx.canvas.height = imageData.height;
  for (var i = 0; i < triangles.length; i+=3) {
      const x1 = points[triangles[i]][0];
      const x2 = points[triangles[i+1]][0];
      const x3 = points[triangles[i+2]][0];
      const y1 = points[triangles[i]][1];
      const y2 = points[triangles[i+1]][1];
      const y3 = points[triangles[i+2]][1];

      vertices.push([x1,y1], [x2,y2], [x3,y3]);
      
      const cx = ~~((x1 + x2 + x3) / 3);
      const cy = ~~((y1 + y2 + y3) / 3);

      var index = (cy * imageData.width + cx) * 4;
      var r = imageData.data[index];
      var g = imageData.data[index + 1];
      var b = imageData.data[index + 2];

      colors.push([r,g,b]);

      
      ctx.lineWidth = 1;
      ctx.save();
      ctx.imageSmoothingQuality = 'high';

      ctx.translate(0, 0);
      ctx.beginPath();
      // ctx.arc(x1, y1, 3, 0, Math.PI * 2);
      // ctx.arc(x2, y2, 3, 0, Math.PI * 2);
      // ctx.arc(x2, y2, 3, 0, Math.PI * 2);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.closePath();

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fill();
      ctx.restore();
  }
  

  return {
    colors,
    vertices: [].concat.apply([], vertices.map(vertex => [(parseFloat(vertex[0]) / imageData.width) * 2 - 1, (parseFloat(vertex[1]) / imageData.height) * 2 - 1])),
    imageData
  }

}

export default makeLowPoly;