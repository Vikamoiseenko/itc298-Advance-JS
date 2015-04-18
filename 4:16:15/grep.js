var fs = require("fs");
var async = require("async");
var path = require("path");

fs.readdir("files", function(err, files) {
  async.each(files, function(filename, callback) {

    fs.readFile(path.join("files", filename), "utf8", function(err, data) {
      // var result = data.search("needle");
      // var found = data.match(result);
      var result = data.search("needle");
      console.log(result);
      if (result == -1) {
        console.log("No matches", filename);
      } else {
        console.log("We found the word needle!!", filename);
      }
      callback();
    });
  }, function() {
    if(err) console.log(err);
    console.log("We are done");
  });
});
