import HandyLib from './handyLib'
import Overlay from './overlay-src'

var handyLib = new HandyLib();
var overlay = new Overlay();


var video = document.getElementById('videoDom');
handyLib.getPresJson(function(data){
  overlay.getNextElement(function(elem){
    overlay.createOverlayDelay(elem, data['presets'][handyLib.getKey()]['transitionDelay']);
  });
  var file = data['presets'][handyLib.getKey()]['file'];
  if(file != undefined){
    video.src = '/docs/video/' + file;
    video.play();
  }else{
    $('#videoDom').html('<h1>This does not work!  Plese fix this!  The slide autoredirect should continue...')
  }
})
$(document).keypress(function(e){
  if(e.key == " "){
    if(video.paused){
      video.play();
    }else{
      video.pause();
    }
  }else if(e.key == "h"){
    handyLib.goHome();
  }
});
