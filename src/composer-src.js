import React from 'react'
import ReactDOM from 'react-dom'
import HandyLib from './HandyLib'

var handyLib = new HandyLib();

// // $()
//
// function test(){
//   console.log('test');
// }
//
// class SelectButton extends React.Component{
//   constructor(props){
//     super(props);
//   }
//   componentDidMount(){
//   }
//   render(){
//     return(<li><a data-name={this.props.name}>{this.props.name}</a></li>);
//   }
// }
//
// ReactDOM.render(
//   <SelectButton name="test" />,
//   $('#mainContainer')[0]
// )

class EditableName extends React.Component {
  constructor(props){
    super(props);
    this.state = {mode: 'text', name: this.props.name};
  }
  componentDidMount(){
    const p = this;
    const dNode = ReactDOM.findDOMNode(p);
    $(dNode).find('i.editable-name').hide();
    $(ReactDOM.findDOMNode(this)).click(function(e){
      if($(e.target).is('i') && $(e.target).hasClass('editable-name')){
        p.setState({mode: 'input'});
      }else if($(e.target).is('i') && $(e.target).hasClass('editable-name-accept')){
              $.ajax({
                type: "POST",
                url: '/update/' + p.props.file + '/' + p.props.data_key +  "/" + 'name',
                data: p.state.name
              });
        p.setState({mode: 'text'});
      }
    });
    $(ReactDOM.findDOMNode(this)).hover(function(e){
      if(e.type == 'mouseenter'){
        $(dNode).find('i.editable-name').fadeIn();
      }else{
        $(dNode).find('i.editable-name').fadeOut();
      }
    });
  }
  updateInputValue(e){
    this.setState({name: e.target.value}) ;
  }
  render(){
    const textStyle = {
      cursor: 'pointer'
    };
    if(this.state.mode == 'text'){
      return [<div><span className="editable-name" data-key={this.props.data_key}>{this.state.name}</span><i className='editable-name tiny material-icons' data-key={this.props.data_key} style={textStyle}>edit</i></div>];
    }else if(this.state.mode == 'input'){
      return <div><div className='valign-wrapper'><div className='input-field inline'><input className='validate' value={this.state.name} data-key={this.props.data_key} onChange={(e) => this.updateInputValue(e)}/></div><i className="material-icons editable-name-accept" style={textStyle}>check</i></div></div>;
    }
  }
}

$.getJSON('/loop/all.json', function(data){
  var keys = Object.keys(data);
  console.log(keys);
  var allItems = keys.map((key) => <li><a href="#" data-name={key}>{data[key]['name']}</a></li>);
  ReactDOM.render([
    <div className="container">
      <div className="row">
        <div className="col s12"><h1>1. Select the loop</h1></div>
      </div>
      <div className="row">
        <a className="dropdown-button btn" href="#" data-activates="loopSelect" id="loopSelectButton">No Loop Selected</a>
        <ul id="loopSelect" className="dropdown-content">{allItems}</ul>
      </div>
    </div>,
    <div id="loopEditor"></div>
  ], $('#mainContainer')[0]);
  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false // Stops event propagation
    }
  );
  $('a').click(function(e){
    // console.log($(e).data('name'));
    // console.log($(e.target).data('name'));
    if($(e.target).parent().parent().is('#loopSelect')){
      $('#loopSelectButton').text($(e.target).text());
      renderSlidesList('testing.json', $('#loopEditor')[0]);
      // $('#slides').children().each(function(){
      //   // console.log(this);
      //   console.log($('li.collection-item').index(this));
      // });
    }

  });
  function renderSlidesList(name, target){
    console.log(name);
    $.getJSON(`/loop/${name}`, function(slide_data){

      var keys = Object.keys(slide_data['presets']);
      var editableElements = keys.map((key) => <li className="collection-item avatar #eeeeee grey lighten-3"><EditableName name={slide_data['presets'][key]['name']} data_key={key} file={name} /><i className="secondary-content material-icons text-black grab">drag_handle</i></li>)
      ReactDOM.render([<div className="divider"></div>,<ul id="slides" className="collection">{editableElements}</ul>], target);
    //   $('i.grab').css('cursor', 'grab');
    //   var drake = dragula([document.getElementById('slides')], {
    //     direction: 'vertical',
    //     moves: function(el, source, handle, sibling){
    //       return true;
    //     },
    //     isContainer: function(el){
    //       return false;
    //     }
    //   });
    //   // $('span.editable-name').append("");
    //   $('i.editable-name').hide();
    //   $('span.editable-name').hover(function(e){
    //     if(e.type == "mouseenter"){
    //       $(e.target).find('i.editable-name').fadeIn();
    //     }else if(e.type == "mouseleave"){
    //       $(e.target).find('i.editable-name').fadeOut();
    //     }
    //   });
    //   function renderEditableName(e){
    //     console.log(e.target);
    //     var key = $(e.target).parent().data('key');
    //     var obj = slide_data['presets'][key];
    //     var slide_name = obj['name'];
    //     $(e.target).data('key').parent().html(`<div class='row'><div class='col s6 m6'><div class='valign-wrapper'><div class='input-field inline'><input class='validate' value='${slide_name}' data-key='${key}'/></div><i class="material-icons editable-name-accept">check</i></div></div><div class='col s6 m6'></div>`);
    //     $('i.editable-name-accept').click(function(e){
    //       // console.log();
    //       var input_obj = $(e.target).parent().find('input');
    //       slide_data['presets'][input_obj.data('key')]['name'] = input_obj.val();
    //       console.log(slide_data['presets'][input_obj.data('key')]['name']);
    //       $.ajax({
    //         type: "POST",
    //         url: '/update/' + name + '/' + input_obj.data('key') + "/" + 'name',
    //         data: input_obj.val()
    //       });
    //       // $(e.target).parent().parent().html(`<span class='editable-name'>${input_obj.val()}</span>`);
    //     });
    //   }
    //   function bindEditableNames(){
    //     $('li.collection-item').click(function(e){
    //       console.log(e);
    //       if(e.target = 'i.editable-name'){
    //         renderEditableName(e);
    //       }
    //       // renderEditableName(e);
    //     });
    //   }
    //   bindEditableNames();
    // });

  });
}
});
