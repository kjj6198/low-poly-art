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

document.querySelector('input[type="file"]')
  .addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      image.src = reader.result;
      getImageData(document.querySelector('img'))
        .then(startLoadingImage)
        .then(imageData => {
          const originData = imageData;
          console.log(imageData);
          const sobelPoints = sobel(imageData.width, imageData.height)(imageData.data);
          const sobelData = new ImageData(sobelPoints, imageData.width, imageData.height);
          ctx.canvas.width = imageData.width;
          ctx.canvas.height = imageData.height;

          // ctx.putImageData(sobelData, 0, 0);
          const randomPoints = randomPickPoints(imageData.width, imageData.height)(Array.from(sobelPoints));

          window.data = makeLowPoly(randomPoints, Delaunay.triangulate(randomPoints))(ctx, originData);
        })
        .then(completeLoadingImage);
    }, false);
  })

const startLoadingImage = (imageData) => {
  return imageData;
}

const completeLoadingImage = () => {

}
