import React from 'react'
import ReactDOM from 'react-dom'
import HandyLib from './HandyLib'

var handyLib = new HandyLib();

export default class Overlay{
  createOverlay_(direct, length){
    $('body').append("<div class='overlay hide'></div>");
    $('head').append("<link href='/css/overlay.css' rel='stylesheet' />")
    ReactDOM.render(<InactivityCounter direct={direct} length={length}/>, $('.overlay')[0]);
  }
  createOverlayDelay(direct, length){
    this.createOverlay_(direct, length);
  }
  createOverlay(direct){
    this.createOverlay_(direct, 40);
  }
  getNextElement(callback){
    var json = handyLib.getPresJson(function(data){
      var keysArray = Object.keys(data['presets']);
      var keyIndex = keysArray.indexOf(handyLib.getKey());
      if(data['presets'].hasOwnProperty(handyLib.getKey())){
        var key = keysArray[keyIndex + 1];
        if(key != undefined){
          // window.location.replace('/pres/' + handyLib.getJsonFile() + '/' + data['presets'][key]['type'] + "/" + key);
          callback('/pres/' + handyLib.getJsonFile() + '/' + data['presets'][key]['type'] + "/" + key);
        }else{
          key = keysArray[0];
          // window.location.replace('/pres/' + handyLib.getJsonFile() + '/' + data['presets'][key]['type'] + "/" + key);
          callback('/pres/' + handyLib.getJsonFile() + '/' + data['presets'][key]['type'] + "/" + key);
        }
        // console.log(data['presets'][keyIndex]);
      }else{
        key = keysArray[0];
        callback('/pres/' + handyLib.getJsonFile() + '/' + data['presets'][key]['type'] + "/" + key);
      }

    });
  }
}

class InactivityCounter extends React.Component{
  constructor(props){
    super(props);
    this.state = {seconds : props.length};
    console.log(props.direct);
  }
  countDown(){
    this.setState(prevState => ({
      seconds: prevState.seconds - 1
    }));
    console.log(this.state.seconds);
    if(this.state.seconds == 10){
      $('.overlay').removeClass('hide');
      $('.overlay').show();
    }else if(this.state.seconds == -1){
      $('.overlay').removeClass('hide');
      $('.overlay').show();
      window.location.replace(this.props.direct);
    }
  }
  resetCounter(){
    this.setState({seconds: 40});
    $('.overlay').slideUp();
  }
  componentDidMount(){
    this.timer = setInterval(() => this.countDown(), 1000);
    $(document).keypress(function(e){

      console.log(e);
      // clearInterval(this.timer);

    });
    $(document).keypress(() => this.resetCounter());
  }


  render(){
    return <div className="overlay-content">The slide will automatically continue in {this.state.seconds}</div>;
  }
}
