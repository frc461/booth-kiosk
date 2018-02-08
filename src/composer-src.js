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
      ReactDOM.render(<div id="slides"><div><p>test</p></div></div>, $('#loopEditor')[0]);
      var drake = dragula(document.getElementById('slides'), {
        direction: 'vertical'
      });
    }

  })
});
