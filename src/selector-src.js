import React from 'react';
import ReactDOM from 'react-dom';

var handyLib = new HandyLib();

var media_set_json = handyLib.getJson('media_set/all.json', (data) => {
  console.log(data);
  const loopKeys = Object.keys(data);
  const loopDropdown = loopKeys.map((key) => <li>{data[key]['name']}</li>);
  ReactDOM.render(<ul>{loopDropdown}</ul>, $('#mainThing')[0]);
});
