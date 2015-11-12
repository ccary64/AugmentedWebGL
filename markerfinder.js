


////////////////////////////////////////////////////////
 //     Web worker ---> multi-threaded javascript
 //////////////////////////////////////////////////////
 importScripts("libs/cv.js");
 importScripts("libs/aruco.js");
 importScripts("libs/svd.js");
 importScripts("libs/posit1-patched.js");
 var detector = new AR.Detector();
var corners = [];

 self.addEventListener('message', function(e) {
   var data = e.data;
   var markers = detector.detect(data.image);
   if (markers.length > 0) {
       var modelSize = 8;
       corners = [];
       for (var j = 0; j < markers[0].corners.length; ++j) {
           corners.push({
               x: markers[0].corners[j].x - (data.width / 2),
               y: (data.height / 2) - markers[0].corners[j].y
           })
       }
       //console.log(corners);
       //compute the pose from the canvas
       var posit = new POS.Posit(modelSize, data.width);
       var pose = posit.pose(corners);
       postMessage({'markers': markers, 'pose': pose});
       self.close();
   }else
       {
           postMessage({'markers': markers, 'pose': pose});
       }
 }, false);





