/**
 * transform imagedata to grayscale
 * 
 * @param  {ImageData} imageData
 * @return {[type]}      [description]
 */
export default function grayscale(imageData) {
  for (var j=0; j< imageData.height; j++)
  {
    for (var i=0; i< imageData.width; i++)
    {
       var index=(i*4)*imageData.width+(j*4);
       var red = imageData.data[index];
       var green = imageData.data[index+1];
       var blue = imageData.data[index+2];
       var alpha = imageData.data[index+3];
       var average = (red+green+blue)/3;
       imageData.data[index]=average;
       imageData.data[index+1]=average;
       imageData.data[index+2]=average;
       imageData.data[index+3]=alpha;
     }
   }

  return imageData;
}