var fs = require('fs')

class HandyLib {
  getJson(file, callback){
    fs.readFile(file, 'utf8', (err, data) => {
      var json_data = JSON.parse(data);
      callback(json_data);
    })
  }
  parseURLParams(){
    url = window.location.href;
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
  }
  findFilefromKey(key, callback){
    getJson('media_set/all.json', (all_data) => {
      callback(all_data[key]['file']);
    })
  }
}
