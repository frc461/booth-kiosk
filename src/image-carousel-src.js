import React from 'react'
import ReactDOM from 'react-dom'

var handyLib = new HandyLib();


class CarouselPictures extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    $(document).ready(function(){
      $('.carousel').carousel({
        depth: '10'
      });
      $('.carousel').magnificPopup({
        delegate: 'a',
        type: 'image',
      })
    });
  }
  render(){
    console.log(this.props.slide_data['presets'][this.props.datakey]['images']);
    var pictures = this.props.slide_data['presets'][this.props.datakey]['images'].map((picture) =>
        <a className='carousel-item' href={'../assets/images/' + picture} style={{'minHeight' : '30%', 'minWidth' : '30%'}}><img src={'../assets/images/' + picture} style={{'minHeight' : '30%', 'minWidth' : '30%'}}/></a>
    );
    return(<div className='carousel' style={{'top' : '0', 'left' : '0', 'position' : 'fixed', 'height' : '100%'}}>{pictures}</div>);
  }
}


handyLib.findFilefromKey(handyLib.findGetParameter('media_set'), (media_set_json_file) => {
  handyLib.getJson('media_set/' + media_set_json_file, (slide_data) => {

    ReactDOM.render(<CarouselPictures slide_data={slide_data} datakey={handyLib.findGetParameter('target')}/>,
      $('#mainThing')[0]
    );

    $(document).keypress(function(e){
      if(e.key == "f"){
        $('.carousel').carousel('next');
      }else if(e.key == "b"){
        $('.carousel').carousel('prev');
      }else if(e.key == "h"){
        handyLib.goHome();
      }else if(e.key == " "){
        $('.carousel-item.active').click();
      }else if(e.key == "Enter"){
        $.magnificPopup.close();
      }
    });
  });
});
