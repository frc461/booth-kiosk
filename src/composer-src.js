import React from 'react'
import ReactDOM from 'react-dom'
import HandyLib from './HandyLib'

var handyLib = new HandyLib();

const slideTypes = {'image-carousel' : 'Image carousel', 'fullscreen_pdf' : 'Fulscreen Pdf', 'video' : 'Video'};

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
                url: '/update/' + p.props.file + '/' + p.props.data_key +  "/" + 'name?rand=' + Math.random(),
                data: p.state.name,
                success: Materialize.toast("Successfully changed name!")
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

class TypeDropdown extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    $('a.dropdown-button').dropdown();
  }
  updateSlideType(obj, type){
    var domNode = ReactDOM.findDOMNode(this)
    $.ajax({
      type: 'POST',
      url: '/update/' + this.props.loop + '/'+ obj.props.data_key + '/type',
      data: type,
      success: function(){
        Materialize.toast('Successfully change type of ' + obj.props.data_key + ' to ' + type);
        $(domNode).find('a.dropdown-button').text(slideTypes[type]);
      }
    });
  }
  render(){
    var slideTypesKeys = Object.keys(slideTypes);
    var dropdownTypes = slideTypesKeys.map((key) => <li><a href="#!" onClick={() => this.updateSlideType(this, key)}>{slideTypes[key]}</a></li>);
    return <div>
      <a className="dropdown-button btn" href="#" data-activates={"type-dropdown-" + this.props.data_key}>{slideTypes[this.props.type]}</a>
      <ul id={"type-dropdown-" + this.props.data_key} className="dropdown-content">
        {dropdownTypes}
      </ul>
    </div>
  }
}


class EditableLoopName extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: this.props.name};
  }
  changeValue(e){
    function success(e){
      // console.log(e)
    }
    $.ajax({
      type: 'POST',
      url: '/updateeverything/' + this.props.key_val + '/name?rand=' + Math.random(),
      data: this.state.name,
      success: Materialize.toast("Successfully updated loop name!")
    })//.success(function(e){
      //console.log('test');
    //})


  }
  updateValue(e){
    this.setState({name: e.target.value});
  }
  render(){
    //TODO: Create non editable state
    return <div className="valign-wrapper"><input value={this.state.name} onChange={(e) => this.updateValue(e)} /><i className="material-icons" style={{cursor: 'pointer'}} onClick={(e) => this.changeValue(e)}>check</i></div>
  }
}

class TransitionDelay extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    $(ReactDOM.findDOMNode(this)).find('input').val((this.props.default == undefined) ? '40' : this.props.default);
    $(ReactDOM.findDOMNode(this)).change(function(e){
      // $.ajax({
      //   type: 'POST',
      //   url: '/update/' +
      // })
    })
  }
  render(){
    return <p className="range-field"><input type="range" min="0" max="100" /></p>
  }
}

$.getJSON('/loop/all.json?rand=' + Math.random(), function(data){
  var keys = Object.keys(data);
  // console.log(keys);
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
    <div id="loopEditor"></div>,
    <div className="fixed-action-btn">
      <a class="btn-floating btn-large blue tooltipped" data-tooltip="Menu" data-position="left">
        <i class="large material-icons">menu</i>
      </a>
    </div>
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
      // $('#loopSelectButton').text($(e.target).text());
      // console.log($('a');
      $('ul#loopSelect').remove();
      $('a#loopSelectButton').replaceWith("<div id='loopNamePlaceholder'></div>");
      ReactDOM.render(<EditableLoopName name={$(e.target).text()} key_val={$(e.target).data('name')}/>, $('div#loopNamePlaceholder')[0]);
      renderSlidesList(data[$(e.target).data('name')]['file'], $('#loopEditor')[0]);
      // $('#slides').children().each(function(){
      //   // console.log(this);
      //   console.log($('li.collection-item').index(this));
      // });
    }

  });
  function renderSlidesList(name, target){
    $.getJSON(`/loop/${name}?rand=` + Math.random(), function(slide_data){

      var keys = Object.keys(slide_data['presets']);
      var editableElements = keys.map((key) => <li className="collection-item avatar #eeeeee grey lighten-3" data-key={key}><EditableName name={slide_data['presets'][key]['name']} data_key={key} file={name} /><TypeDropdown data_key={key} type={slide_data['presets'][key]['type']} loop={name} /><TransitionDelay default={slide_data['presets'][key]['transitionDelay']}  /><i className="secondary-content material-icons text-black grab">drag_handle</i></li>)
      ReactDOM.render([<div className="divider"></div>,<div className="row"><div className="col s12"><div className="container"><h1>2. Build the loop</h1></div></div></div>,<ul id="slides" className="collection">{editableElements}</ul>], target);
      $('.grab').css({cursor: 'grab'})
      $('.grab').on('mousedown', function(e){
        $(this).parent().css({cursor: 'grabbing'})
      });
      $('.grab').parent().on('mouseup', function(e){
        $('li').css({cursor: 'default'})
      });
      $('.grab').on('mouseup', function(e){
        $('li.collection-item').css({cursor: 'default'})
      });
      var dragObj = dragula({
        isContainer: function (el) {
          return false; // only elements in drake.containers will be taken into account
        },
        moves: function (el, source, handle, sibling) {
          if($(handle).hasClass('grab')){
            return true;
          }else{
            return false;
          }
        },
      });
      dragObj.containers.push(document.getElementById('slides'));
      dragObj.on('drop', function(e){
        // console.log(slide_data['presets']);
        // var objX = slide_data['presets']
        var tmpPresets = {};
        $('ul#slides').children().each(function(i, val){
          // console.log(slide_data['presets'][$(val).data('key')])
          tmpPresets[$(val).data('key')] = slide_data['presets'][$(val).data('key')]
          // $('ul#slides').children()
          // console.log($(val).data('key'));
        });
        // console.log(tmpPresets);
        $.ajax({
          type: 'POST',
          url: '/updateBulkPresets/' + name + '?rand=' + Math.random(),
          data: JSON.stringify(tmpPresets),
          contentType : 'application/json',
          success: Materialize.toast("Successfully updated loop order!")
        })
      });
  });
}
});
