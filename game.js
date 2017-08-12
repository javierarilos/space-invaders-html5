;(function() {
  var Game = function(canvasId) {
    var canvas = document.getElementById(canvasId);
    var screen = canvas.getContext('2d');
    var gameSize = {
      x: canvas.width,
      y: canvas.height
    };

    console.log("game loaded OK");

  };

  Game.prototype = {

  };

  window.onload = function() {
    new Game('screen');

  };

})();
