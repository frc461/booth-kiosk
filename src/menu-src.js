import React from 'react';
import ReactDOM from 'react-dom';

const handyLib = new HandyLib();

/*
  Menu option items
*/
class MenuItem extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    /* Setup the first card with the selected styling */
    $($('.card')[0]).not('.selected').addClass('selected');
    $('.selected').addClass('#ffd600 yellow accent-4');
    $('.card').not('.selected').removeClass('#ffd600 yellow accent-4');
  }
  render(){
    return <div className="col m4">
        <div className="card" data-key={this.props.datakey}>
          <div className="card-image">
          </div>
          <div className="card-content">
            <span className="card-title">{this.props.name}</span>
          </div>
        </div>
      </div>;
  }
}

/*
  Read the menu items from the file and put them in the document
*/
handyLib.findFilefromKey(handyLib.findGetParameter('media_set'), (media_set_json_file) => {
  handyLib.getJson('media_set/'+ media_set_json_file, (data) => {
    ReactDOM.render(Object.keys(data['presets']).map((item) => <MenuItem name={data['presets'][item]['name']} datakey={item}/>), $('#mainThing')[0]);

    function fancyImage(){
      $('.card').not('.selected').find('.image').remove();
      var type = data['presets'][$('.selected').data('key')]['type'];

      if(type == "image-carousel"){
        var images = data['presets'][$('.selected').data('key')]['images'];
        var image = data['presets'][$('.selected').data('key')]['images'][Math.floor(Math.random()*images.length)];
        if($('.selected').find('.image').length == 0){
          $('.selected').find('.card-image').append("<div style='width: 620px; height: 461px; overflow: hidden;display: block; margin: auto;' class='image'><img /></div>");
        }
        $('.selected').find('img').attr('src', '../assets/images/' + image);
      }else if(type == "fullscreen-image-slider"){
        var images = data['presets'][$('.selected').data('key')]['images'];
        var image = data['presets'][$('.selected').data('key')]['images'][Math.floor(Math.random()*images.length)];
        if($('.selected').find('.image').length == 0){
          $('.selected').find('.card-image').append("<div style='width: 620px; height: 461px; overflow: hidden;display: block; margin: auto;' class='image'><img /></div>");
        }
        $('.selected').find('img').attr('src', '../assets/images/' + image);
      }
      setTimeout(fancyImage, 1000);
    }
    fancyImage();
    /*
      Detect keypress
      F = Forward
      B = Backward
    */
    $(document).keypress((e) => {
      if(e.key == "f"){
        if($('div.selected').parent().next().children()[0] != undefined){
          $($('div.selected').parent().next().children()[0]).addClass('selected');
          $($('.selected')[0]).removeClass('selected');
          clearNonSelected();
        }
      }else if(e.key == "b"){
        if($('div.selected').parent().prev().children()[0] != undefined){
          $($('div.selected').parent().prev().children()[0]).addClass('selected');
          $($('.selected')[1]).removeClass('selected');
          clearNonSelected();
        }
      }else if(e.key == " "){
        var type = data['presets'][$('.selected').data('key')]['type'];
        handyLib.navToContent(type, handyLib.findGetParameter('media_set'), $('.selected').data('key'));
      }
    });
  });
});

/*
  Restore non selected items to original state
*/
function clearNonSelected(){
  $('.selected').addClass('#ffd600 yellow accent-4');
  $('.card').not('.selected').removeClass('yellow accent-4');
  $([0, 1, 2, 3, 4, 5]).each(function(i, v){
    $('.card').not('.selected').removeClass('z-depth-' + v);
  });
}



/*
  Make the selected card have a "glowing" effect
*/
function glowingCard(){
  var time = 100;

  $([1, 2, 3, 4, 5, 4, 3, 2, 1]).each((i,v) => {
    setTimeout(() => {
      $('.selected').addClass('z-depth-' + v); //Give selected card the new shading
      $('.selected').removeClass('z-depth-' + (v + 1)); //Get rid of previous shades. if it does exist, who cares!?
      $('.selected').removeClass('z-depth-' + (v - 1));
    }, time);
    time += 100; //To keep from going crazy fast
  });

  setTimeout(glowingCard, 10 + time); //Do it again
}

/*
  Initalize the "glowing card" effect
*/
glowingCard(0);
