var fs = require('fs')

class HandyLib {
  getJson(file, callback){
    fs.readFile(file, 'utf8', (err, data) => {
      var json_data = JSON.parse(data);
      callback(json_data);
    })
  }
}
