const sobel = (width, height) => (imageData) => {
  const bindPixelAt = (imageData) => {
    return function(x, y, i) {
      i = i || 0;
      return imageData[((width * y) + x) * 4 + i];
    };
  }

  const pixelAt = bindPixelAt(imageData);
  let sobalData = [];
  const kernelX = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
  ];

  const kernelY = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]
  ];

  for(var y = 0; y < height; y++) {
    for(var x = 0; x < width; x++) {
      const X = (
        (kernelX[0][0] * pixelAt(x - 1, y - 1)) +
        (kernelX[0][1] * pixelAt(x, y - 1)) +
        (kernelX[0][2] * pixelAt(x + 1, y - 1)) +
        (kernelX[1][0] * pixelAt(x - 1, y)) +
        (kernelX[1][1] * pixelAt(x, y)) +
        (kernelX[1][2] * pixelAt(x + 1, y)) +
        (kernelX[2][0] * pixelAt(x - 1, y + 1)) +
        (kernelX[2][1] * pixelAt(x, y + 1)) +
        (kernelX[2][2] * pixelAt(x + 1, y + 1))
      );

      const Y = (
        (kernelY[0][0] * pixelAt(x - 1, y - 1)) +
        (kernelY[0][1] * pixelAt(x, y - 1)) +
        (kernelY[0][2] * pixelAt(x + 1, y - 1)) +
        (kernelY[1][0] * pixelAt(x - 1, y)) +
        (kernelY[1][1] * pixelAt(x, y)) +
        (kernelY[1][2] * pixelAt(x + 1, y)) +
        (kernelY[2][0] * pixelAt(x - 1, y + 1)) +
        (kernelY[2][1] * pixelAt(x, y + 1)) +
        (kernelY[2][2] * pixelAt(x + 1, y + 1))
      )
      const magnitude = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2)) >>> 0;
      /*                 R          G         B        A  */
      sobalData.push(magnitude, magnitude, magnitude, 255);
    }
  }

  return new Uint8ClampedArray(sobalData);
}

export default sobel;