export default function getImageData(image) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = image.src;
    img.crossOrigin = 'Anonymous';
    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');
      img.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        
        ctx.drawImage(img, 0, 0, img.width, img.height);
        resolve(ctx.getImageData(0, 0, img.width, img.height));
      }
  });
}