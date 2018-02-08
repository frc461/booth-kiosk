import React from 'react'
import ReactDOM from 'react-dom'
import HandyLib from './handyLib'

const handyLib = new HandyLib();

import Overlay from './overlay-src'

const overlay = new Overlay();

overlay.getNextElement(function(data){
  overlay.createOverlay(data);
});


$(document).ready(function(){
  handyLib.getPresJson(function(json){
    class CarouselPictures extends React.Component{
      constructor(props){
        super(props);
      }
      componentDidMount(){
        $(document).ready(function(){
          $('.carousel').carousel();
          $('.carousel').magnificPopup({
            delegate: 'a',
            type: 'image'
          })
        });
      }
      render(){
        var pictures = json['presets'][handyLib.getKey()]['images'].map((picture) =>
              <a className='carousel-item' href={'/docs/images/' + picture}><img src={'/docs/images/' + picture} /></a>
          );
          return(<div className='carousel'>{pictures}</div>);
        }
    }
    ReactDOM.render(
      <CarouselPictures />,
      $('#mainContainer')[0]
    );
  });
});

$(document).keypress(function(e){
  if(e.key == "f"){
    $('.carousel').carousel('next');
  }else if(e.key == "b"){
    $('.carousel').carousel('prev');
  }else if(e.key == " "){
    $('.carousel-item.active').click();
  }else if(e.key == "Enter"){
    $.magnificPopup.close();
  }else if(e.key == "h"){
    handyLib.goHome();
  }

});
