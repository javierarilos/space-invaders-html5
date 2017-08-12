;(function() {
  var Game = function(canvasId) {
    var canvas = document.getElementById(canvasId);
    var scr = canvas.getContext('2d');
    var gameSize = {
      x: canvas.width,
      y: canvas.height
    };

    var self = this;
    self.bodies = [new Player(self, gameSize)];
    var tick = function(){
      self.update();
      self.draw(scr, gameSize);
      requestAnimationFrame(tick);
    };

    tick();

  };

  Game.prototype = {
    update: function() {
      console.log('hi!!')

    },
    draw: function(scr, gameSize) {
      for (var i = 0; i < this.bodies.length; i++) {
        drawRect(scr,  this.bodies[i]);
      }
    }

  };

  var Player = function(game, gameSize) {
    this.game = game;
    this.size = {x: 15, y: 15};
    this.center = {
      x: gameSize.x / 2,
      y: gameSize.y - this.size.x
    };
  };

  Player.prototype = {
    update: function() {

    }
  };

  var drawRect = function(scr, body) {
    scr.fillRect(
      body.center.x - body.size.x/2,
      body.center.y - body.size.y/2,
      body.size.x,
      body.size.y
    );
  };

  window.onload = function() {
    new Game('screen');

  };

})();
