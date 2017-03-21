import sobel from './sobel';
import getImageData from './getImageData';
import grayscale from './grayscale';
import makeLowPoly from './makeLowPoly';

const image = document.querySelector('img');
const canvas = document.querySelector('#canvas');
canvas.width = image.width;
canvas.height = image.height;
const ctx = canvas.getContext('2d');

const randomPickPoints = (width, height) => (fixedPoints) => {
  let egdePoints = [];
  let randomPoints = [];

  // if sobel point > 250, be seen as edge point.
  for (var x = 0; x < width; x++) {
    var i = x * width * 4 + 4;
    for(var y = 0; y < height; y++, i+=4) {
      if (fixedPoints[i] === 255) {
        egdePoints.push([x, y]);
      }
    }

    randomPoints.push([Math.random() * width, Math.random() * height]);
  }

  var length = ~~(egdePoints.length / 20);
  
  // for(var i = 0; i < length; i++) {
  //   const random = Math.floor(Math.random() * egdePoints.length);
  //   randomPoints.push(egdePoints[random]);
  //   egdePoints.splice(random, 1);
  // }

  return egdePoints.concat(randomPoints).concat([[0,0], [0, height], [width, 0], [width, height]]);
}

setTimeout(() => {
  const image = document.querySelector('img');

  ctx.drawImage(image, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const originData = ctx.getImageData(0, 0, image.width, image.height);
  const newData = grayscale(imageData);

  const sobelPoints = sobel(newData.width, newData.height)(newData.data);
  const sobelData = new ImageData(sobelPoints, newData.width, newData.height);


  ctx.clearRect(0, 0, 960,960);
  // ctx.putImageData(sobelData, 0, 0);

  const randomPoints = randomPickPoints(newData.width, newData.height)(Array.from(sobelPoints));
  

  // ctx.clearRect(0, 0, 960,960);
  // ctx.fillStyle = 'rgba(0,0,0,255)';
  // randomPoints.forEach(points => {
  //   ctx.fillRect(points[0], points[1], 2, 2);
  // });

  // ctx.clearRect(0, 0, 960,960);

  // console.log(Delaunay.triangulate(randomPoints))

  console.log(makeLowPoly(randomPoints, Delaunay.triangulate(randomPoints))(ctx, originData));

}, 1000)

// getImageData()
//   .then(image => {
//     return image;
//   })
//   .then(image => {
//     return {
//       width: image.width,
//       height: image.height,
//       data: grayscale(image.data)
//     }
//   })
//   .then(image => {
//     const ctx = document.querySelector('#canvas').getContext('2d');
//     const grayscaleImage = new ImageData(image.data, image.width, image.height);

//     ctx.putImageData(grayscaleImage, 50, 50);

//   })

// var canvas = document.getElementById('blur');
// var ctx    = canvas.getContext('2d');

// var image = document.querySelector('#image');
// image.crossOrigin = 'Anonymous';
// ctx.drawImage(image, 0, 0, image.width, image.height);
// var imageData = ctx.getImageData(0, 0, image.width, image.height);
// var width = image.width;
// var height = image.height;

// var m = 3;
// var n = 4;

// var data = createGrayscaleData(imageData.data);
// var sobalData = createSobalData(data);
// var newImageData = new ImageData(sobalData, 600, 600);
// // ctx.putImageData(newImageData, 200, 300);

// // set Filter

// /*
// 索貝爾算子（Sobel operator）是圖像處理中的算子之一，
// 主要用作邊緣檢測。
// 在技術上，它是一離散性差分算子，用來運算圖像亮度函數的梯度之近似值。
// 在圖像的任何一點使用此算子，將會產生對應的梯度矢量或是其法矢量。
// [WIP]
// */

// function main() {
//   var p = [];
//   var pp = [];
//   var collects = Array.from(sobalData);
//   for (var x = 0; x < 600; x++) {
//     var i = x * 600 * 4 + 4;
//     for(var y = 0; y < 600; y++, i+=4) {
//       if (collects[i] > 250) {
//         p.push([x, y]);
//       }
//     }

//     pp.push([Math.random() * 600, Math.random() * 600]);
//   }
//   var length = ~~(p.length / 20);
//   var random = 0;
//   for(var i = 0; i < length; i++) {
//     random = Math.floor(Math.random() * p.length);
//     pp.push(p[random]);
//     p.splice(random, 1);
//   }

//   pp.push([0,0], [0, 600], [600, 0], [600, 600]);

//   var triangle = Delaunay.triangulate(pp);

//   var x1, x2, x3, y1, y2, y3, cx, cy;

//   for (var i = 0; i < triangle.length; i+=3) {
//     x1 = pp[triangle[i]][0];
//     x2 = pp[triangle[i +1]][0];
//     x3 = pp[triangle[i+2]][0];
//     y1 = pp[triangle[i]][1];
//     y2 = pp[triangle[i+1]][1];
//     y3 = pp[triangle[i+2]][1];
    
//     cx = ~~((x1 + x2 + x3) / 3);
//     cy = ~~((y1 + y2 + y3) / 3);

//     var index = (cy * imageData.width + cx) * 4;
//     var r = imageData.data[index];
//     var g = imageData.data[index + 1];
//     var b = imageData.data[index + 2];

//     ctx.lineWidth = 0;
//     ctx.save();
//     ctx.imageSmoothingQuality = 'high';

//     ctx.translate(200, 0);
//     ctx.beginPath();
//     ctx.moveTo(x1, y1);
//     ctx.lineTo(x2, y2);
//     ctx.lineTo(x3, y3);
//     ctx.closePath();
//     ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

//     if ((r + g + b) / 3 > 0) {
//       ctx.fill();  
//     }
//     ctx.restore();

//   }

// }

// main();