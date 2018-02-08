import React from 'react'
import ReactDOM from 'react-dom'
import HandyLib from './handyLib'

import Overlay from './overlay-src'

const overlay = new Overlay();

overlay.getNextElement(function(data){
  overlay.createOverlay(data);
});

const handyLib = new HandyLib();

handyLib.getPresJson(function(json){
  class ClickableTile extends React.Component{
    constructor(props){
      super(props);
    }
    componentDidMount(){
      if($('.selected').length){

      }else{
        $(ReactDOM.findDOMNode(this)).find('.card').addClass("selected");
        $('.selected').css("border-color", "red");
        $('.selected').addClass('#ffd600 yellow accent-4');
        $('.card').not('.selected').removeClass('#ffd600 yellow accent-4');
      }

    }
    render(){
      var elem = <div className="col m4"><div className="card" data-type={this.props.type} data-name={this.props.name} data-key={this.props.datakey}>
        <div className="card-content">{this.props.name}</div></div>
      </div>;
      return(elem);
    }
  }

  class HomeTiles extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      const tiles = $.map(json['presets'], (obj, key) =>
        <ClickableTile name={obj.name} type={obj.type} datakey={key} />
      );
    return(<div className="row">{tiles}</div>);

    }
  }

  ReactDOM.render(
    <HomeTiles />,
    $('#mainContainer')[0]
  )
});
var fancySelectedCardNonsensei = 0;
var fancySelectedCardNonsenseDir = 0;
function fancySelectedCardNonsense(){
  if(fancySelectedCardNonsenseDir == 0){
    $('.card.selected').addClass('z-depth-' + fancySelectedCardNonsensei);
    $('.card.selected').removeClass('z-depth-' + (fancySelectedCardNonsensei - 1));
    fancySelectedCardNonsensei++;
  }else{
    $('.card.selected').addClass('z-depth-' + fancySelectedCardNonsensei);
    $('.card.selected').removeClass('z-depth-' + (fancySelectedCardNonsensei + 1));
    fancySelectedCardNonsensei--;
  }
  if(fancySelectedCardNonsensei == 5){
    fancySelectedCardNonsenseDir = !fancySelectedCardNonsenseDir;
    fancySelectedCardNonsensei = 5;
  }else if(fancySelectedCardNonsensei == -1){
    fancySelectedCardNonsenseDir = !fancySelectedCardNonsenseDir;
    fancySelectedCardNonsensei = 0;
  }
  setTimeout(fancySelectedCardNonsense, 150);
}
fancySelectedCardNonsense(0);

var selectCard = 0;
$(document).keypress(function(e){
  if(e.key == "f"){
    if(selectCard < $('.card').length - 1){
      selectCard++;
    }
    $('.card').removeClass('selected');
    var x = selectCard;
    $($('.card').get(x)).addClass('selected');
  }else if(e.key == "b"){
    if(selectCard > 0){
      selectCard--;
    }
    var x = selectCard;
    $('.card').removeClass('selected');
    $($('.card').get(x)).addClass('selected');
  }
  $([0, 1, 2, 3, 4, 5]).each(function(i, v){
    $('.card').not('.selected').removeClass('z-depth-' + v);
  });
  if(e.key == " "){
    console.log($('.selected').data('key'));
    window.location.replace('/pres/' + handyLib.getJsonFile() + '/' + $('.selected').data('type') + "/" + $('.selected').data("key"));
  }
  $('.selected').addClass('#ffd600 yellow accent-4');
  $('.card').not('.selected').removeClass('#ffd600 yellow accent-4');
});
