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
      console.log('hi!!');
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].update();
      }

    },
    draw: function(scr, gameSize) {
      scr.clearRect(0, 0, gameSize.x, gameSize.y);
      for (var i = 0; i < this.bodies.length; i++) {
        drawRect(scr,  this.bodies[i]);
      }
    }

  };

  var Player = function(game, gameSize) {
    this.game = game;
    this.size = {x: 15, y: 15};
    this.center = {x: gameSize.x / 2, y: gameSize.y - this.size.x};
    this.keyboarder = new Keyboarder();
  };

  Player.prototype = {
    update: function() {
      console.log('player.update hello!');
      if(this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        this.center.x -= 2;
      } else if(this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        this.center.x += 2;
      }

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

  var Keyboarder = function() {
    var keyState = {};

    window.onkeydown = function(e) {
      keyState[e.keyCode] = true;
    };

    window.onkeyup = function(e) {
      keyState[e.keyCode] = false;
    };

    this.isDown = function(keyCode) {
      return keyState[keyCode] === true;
    };

    this.KEYS = {LEFT: 37, RIGHT: 39, SPACE: 32};

  }

  window.onload = function() {
    new Game('screen');

  };

})();
