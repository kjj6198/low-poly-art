import sobel from './sobel';
import getImageData from './getImageData';
import grayscale from './grayscale';
import makeLowPoly from './makeLowPoly';
import randomPickPoints from './randomPickPoint.js';

const image = document.querySelector('img');
const canvas = document.querySelector('#canvas');
canvas.width = image.width;
canvas.height = image.height;
const ctx = canvas.getContext('2d');

// setTimeout(() => {
//   const image = document.querySelector('img');

//   ctx.drawImage(image, 0, 0);
  
//   const imageData = ctx.getImageData(0, 0, image.width, image.height);
//   const originData = ctx.getImageData(0, 0, image.width, image.height);
//   const newData = grayscale(imageData);

//   const sobelPoints = sobel(newData.width, newData.height)(newData.data);
//   const sobelData = new ImageData(sobelPoints, newData.width, newData.height);


//   ctx.clearRect(0, 0, 960,960);
//   // ctx.putImageData(sobelData, 0, 0);

//   const randomPoints = randomPickPoints(newData.width, newData.height)(Array.from(sobelPoints));
  

//   // ctx.clearRect(0, 0, 960,960);
//   // ctx.fillStyle = 'rgba(0,0,0,255)';
//   // randomPoints.forEach(points => {
//   //   ctx.fillRect(points[0], points[1], 2, 2);
//   // });

//   // ctx.clearRect(0, 0, 960,960);

//   // console.log(Delaunay.triangulate(randomPoints))

//   console.log(makeLowPoly(randomPoints, Delaunay.triangulate(randomPoints))(ctx, originData));

// }, 1000)

getImageData(document.querySelector('img'))
  .then(imageData => {
    const originData = imageData;
    const grayscaleData = grayscale(imageData);
    const sobelPoints = sobel(grayscaleData.width, grayscaleData.height)(grayscaleData.data);
    const sobelData = new ImageData(sobelPoints, imageData.width, imageData.height);
    const randomPoints = randomPickPoints(imageData.width, imageData.height)(Array.from(sobelPoints));

    makeLowPoly(randomPoints, Delaunay.triangulate(randomPoints))(ctx, originData);
  });