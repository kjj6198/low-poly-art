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

getImageData(document.querySelector('img'))
  .then(imageData => {
    const originData = imageData;
    // console.log(originData);
    // const grayscaleData = grayscale(imageData);
    const sobelPoints = sobel(imageData.width, imageData.height)(imageData.data);
    const sobelData = new ImageData(sobelPoints, imageData.width, imageData.height);
    const randomPoints = randomPickPoints(imageData.width, imageData.height)(Array.from(sobelPoints));

    window.data = makeLowPoly(randomPoints, Delaunay.triangulate(randomPoints))(ctx, originData);
});

import gl from './gl';