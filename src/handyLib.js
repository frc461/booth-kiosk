export default class HandyLib {
  getJsonFile(){
    const root = '/pres/';
    var pathr = window.location.pathname;
    pathr = pathr.replace(root, "");
    pathr = pathr.substr(0, pathr.lastIndexOf("/"));
    var path_ = pathr;
    path_ = path_.substr(0, path_.lastIndexOf("/"));
    return path_;
  }

  getPresJson(callback){
    var path_ = this.getJsonFile();

    var val = $.getJSON(`/loop/${path_}`, function(data){
      callback(data);
    });
  }

  getKey(){
    var path = window.location.pathname;
    path = path.substr(path.lastIndexOf("/"), path.length);
    path = path.replace("/", "");
    return(path);
  }

  goHome(){
    var path = window.location.pathname;
    path = path.substr(0, path.lastIndexOf("/"));
    path = path.substr(0, path.lastIndexOf("/"));
    path = path + "/h/";
    window.location.replace(path);
    // console.log(path);
  }
}
