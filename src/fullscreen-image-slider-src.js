import React from 'react'
import ReactDOM from 'react-dom'

var handyLib = new HandyLib();

class FullscreenCarousel extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    $('.slider').slider();
    $('.slider').magnificPopup({
      delegate: 'a',
      type: 'image'
    });
  }
  render(){
    var pictures = this.props.slide_data['presets'][handyLib.getKey()]['images'].map((picture) =>
          <li><a href={'../assets/images/' + picture}><object data={'../assets/images/' + picture} style={{'max-width': '100%', 'max-height': '100%', left : '50%', top: '50%', position: 'fixed', transform: 'translate(-50%, -50%)'}} className="center" align="middle"></object></a></li>
      );
      return <div className='slider fullscreen'><ul className="slides">{pictures}</ul></div>
  }
}


handyLib.findFilefromKey(handyLib.findGetParameter('media_set'), (media_set_json_file) => {
  handyLib.getJson('media_set/' + media_set_json_file, (slide_data) => {
    ReactDOM.render(<FullscreenCarousel slide_data={slide_data} />,
      $('#mainContainer')[0]
    );


    $(document).keypress(function(e){
      if(e.key == "f"){
        $('.slider').slider('next');
      }else if(e.key == "b"){
        $('.slider').slider('prev');
      }else if(e.key == "h"){
        handyLib.goHome();
      }else if(e.key == " "){
        $('.active').find('a').click();
      }else if(e.key == "Enter"){
        $.magnificPopup.close();
      }
    });
  });
});
