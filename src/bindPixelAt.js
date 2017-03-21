const bindPixelAt = (width) => (data) => {
  return function(x, y, i) {
    i = i || 0;
    return data[((width * y) + x) * 4 + i];
  };
}

export default bindPixelAt;