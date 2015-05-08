var fs = require("fs");
var hapi = require("hapi");
var server = new hapi.Server();
server.connection({port: 8000});
server.start();


//set up configurations
server.views({
  path: "templates",
  engines: {
    html: require("handlebars")
  },
  isCached: false,
  layoutPath: "layouts",
  layout: "default",
  partialsPath: "templates/partials"
});
//register route
server.route({
  method: "GET",
  //path is root
  path: "/",
  handler: function(req, reply) {
    reply.view("index", {
      title: "Home"
    });
  }
});

server.route({
  method: "GET",
  path: "/classes",
  handler: function(req, reply) {
fs.readFile("classes.json", "utf8", function(err, data) {
  var classList = JSON.parse(data);
  //use a database
//  db.all("SELECT * FROM CLASSEES", fanction(err, classList))
    reply.view("classes", {
      title: "Classes",
      admin: true,
      classes: classList
    });
  });
  }
});



server.route({
  method: "GET",
  path: "/assets/{param*}",
  handler: {
    directory: {
      path: "public"
    }
  }
});
