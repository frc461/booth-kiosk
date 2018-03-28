var fs = require('fs')

class HandyLib {
  getJson(file, callback){
    fs.readFile(file, 'utf8', (err, data) => {
      var json_data = JSON.parse(data);
      callback(json_data);
    })
  }
  findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
  }
  findFilefromKey(key, callback){
    this.getJson('media_set/all.json', (all_data) => {
      callback(all_data[key]['file']);
    })
  }
  navToContent(type, media_set, target){
    window.location.href = type + ".html?media_set=" + media_set + "&target=" + target;
  }
  goHome(){
    window.location.href = "menu.html?media_set=" + this.findGetParameter('media_set')
  }
  getKey(){
    return this.findGetParameter('target');
  }
}
