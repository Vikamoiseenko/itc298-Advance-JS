var fs = require("fs");
var hapi = require("hapi");
var server = new hapi.Server();
server.connection({port: 8000});
server.start();


server.views({
  path: "templates",
  engines: {
    html: require("handlebars")
  },
  isCached: false,
  layoutPath: "layouts",
  layout: "default",
});

server.route({
  method: "GET",
  path: "/",
  handler: function(req, reply) {
    reply.view ("index",{
      title: "Home Page"
    });
  }
});

server.route({
  method: "GET",
  path: "/theaters",
  handler: function(req, reply) {
    fs.readFile("movies.json", "utf8", function(err, data){
    var movieList = JSON.parse(data);
      reply.view ("theaters",{
        title: "Movies",
        movies: movieList
      });
    });
  }
});

server.route({
  method: "GET",
  path: "/view/{index}",
  handler: function(req, reply) {
    fs.readFile("movies.json", "utf8", function(err, data){
    var movieList = JSON.parse(data);
    var movie = movieList[req.params.index];
    reply.view ("view",{
      title: "Descriptions of movies",
      feature: movie
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
