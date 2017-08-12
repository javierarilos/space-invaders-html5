;(function() {
  var Game = function(canvasId) {
    var canvas = document.getElementById(canvasId);
    var scr = canvas.getContext('2d');
    var gameSize = {
      x: canvas.width,
      y: canvas.height
    };

    var self = this;
    self.bodies = createInvaders(self).concat(new Player(self, gameSize));
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
    },
    addBody: function(body) {
      this.bodies.push(body);
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

      if(this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
        var bullet = new Bullet(
          {x: this.center.x, y: this.center.y - this.size.y/2},
          {x: 0, y: -6}  // bullet speed
        );
        this.game.addBody(bullet);
      }
    }
  };

  var Invader = function(game, center) {
    this.game = game;
    this.size = {x: 15, y: 15};
    this.center = center;
    this.patrolX = 0;
    this.speedX = 0.3;
  };

  Invader.prototype = {
    update: function() {
      if (this.patrolX < 0 || this.patrolX > 40) {
        this.speedX = -this.speedX;
      }

      this.center.x += this.speedX;
      this.patrolX += this.speedX;

    }
  };

  var createInvaders = function(game) {
    var invaders = [];

    for (var i = 0; i < 24; i++) {
      var x = 30 + (i % 8) * 30;
      var y = 30 + (i % 3) * 30;
      invaders.push(new Invader(game, {x: x, y: y}));
    }

    return invaders;
  };

  var Bullet = function(center, velocity) {
    this.size = {x: 3, y: 3};
    this.center = center;
    this.velocity = velocity;
  };

  Bullet.prototype = {
    update: function() {
      this.center.x += this.velocity.x;
      this.center.y += this.velocity.y;
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
