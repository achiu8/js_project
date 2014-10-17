$(document).ready(function() {
  var view = new View();
  var server = new Server(view);
  var controller = new Controller(server);
});
