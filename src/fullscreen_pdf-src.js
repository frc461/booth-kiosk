import React from 'react'
import ReactDOM from 'react-dom'
import PDF from 'react-pdf-js-infinite';

import HandyLib from './handyLib';
var handyLib = new HandyLib();

import Overlay from './overlay-src'

const overlay = new Overlay();

overlay.getNextElement(function(data){
  overlay.createOverlay(data);
});

ReactDOM.render(
<PDF file="/docs/pdf/Testing%20Presentation.pdf"/>,
  $('#mainContainer')[0]
);

$(document).ready(function(){
   // <div className="slider"><ul className="slides">
  //</ul></div>

  $('canvas').parent().addClass('slider fullscreen');
  $('.slider').wrapInner('<ul class="slides"></ul>')
  // $('.slides').find("div").detach();
  $('canvas').each(function(e){
    // $($('canvas').get(e)).wrap('<div class="carousel-item"></div>');
    $($('canvas').get(e)).wrap('<li class="center"></li>');
  });
  $('.slider').slider();
});

// import PdfViewer from './pdfViewer'
//
// var pdfViewer = new PdfViewer();
//
// pdfViewer.setWorker(pdfViewer.getDefaultWorker());
//
// pdfViewer.showPdf('/docs/pdf/Testing%20Presentation.pdf', document.getElementById('the-canvas'), 0);
$(document).keypress(function(e){
  if(e.key == "f"){
    $('.slider').slider('next');
  }else if(e.key == "b"){
    $('.slider').slider('prev');
  }else if(e.key == "h"){
    handyLib.goHome();
  }
});
