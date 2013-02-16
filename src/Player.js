Player = (function() {
  function constructor() {
    this.trail = [];
    this.maximumTrailLength = 30;

    if (!localStorage["coinsCaught"] || currentMapNumber == 15) {
      this.coins = 0;
      localStorage["coinsCaught"] = "0";
    } else {
      this.coins = parseInt(localStorage["coinsCaught"]);
    }

    if (currentMapNumber == 15) {
      maximumDeathsPerLevel = 0;
      localStorage["maximumDeathsPerLevel"] = "0";

      numberOfDeaths = 0;
      localStorage["numberOfDeaths"] = "0";
    }

    this.coinsOnCurrentLevel = 0;
    this.deathsOnCurrentLevel = 0;

    this.reloadVariables();
  }

  constructor.prototype = {
    reloadVariables: function() {
      this.hasKey = false;

      this.x = currentMap.playerX;
      this.y = currentMap.playerY;

      this.vx = 0;
      this.vy = 0;

      this.canJump = false;

      this.coinsOnCurrentLevel = 0;

      this.canUpdate = true;
    },

    update: function() {
      if (!this.canUpdate)
        return;
      
      /* Handle horizontal movement */
      if ((isDown("right") || isDown("d")) && this.vx < 4)
        this.vx += 0.5;

      if ((isDown("left") || isDown("a")) && this.vx > -4)
        this.vx -= 0.5;

      /* Handle vertical movement */
      if (currentMap.collisionAt(this.x, this.y + 2)) {
        this.canJump = true;
      }

      if (currentMap.collisionAt(this.x, this.y - 1)) {
        this.canJump = false;
      }

      if (isDown("up") || isDown("w")) {
        if (this.canJump) {
          this.vy -= 0.3;
        }
      } else {
        this.canJump = false;
      }

      /* Apply gravity */
      if (!currentMap.collisionAt(this.x, this.y + 2))
        this.vy += 0.1;

      /* Apply horizontal friction */
      if (this.vx > 0.1) this.vx -= 0.1;
      if (this.vx < -0.1) this.vx += 0.1;
      if (Math.abs(this.vx) < 0.1) this.vx = 0;

      /* Update positions and handle collision (weee brute force) */
      if (this.vx > 0) {
        for (var i = 0; i < Math.floor(this.vx); i++) {
          if (!currentMap.collisionAt(this.x + 2, this.y) && !currentMap.collisionAt(this.x + 2, this.y + 1)) {
            this.x++;
          } else {
            this.vx = 0;
            break;
          }
        }
      } else if (this.vx < 0) {
        for (var i = 0; i < Math.floor(-this.vx); i++) {
          if (!currentMap.collisionAt(this.x - 1, this.y) && !currentMap.collisionAt(this.x - 1, this.y + 1)) {
            this.x--;
          } else {
            this.vx = 0;
            break;
          }
        }
      }

      if (this.vy > 0) {
        for (var i = 0; i < Math.floor(this.vy); i++) {
          if (!currentMap.collisionAt(this.x, this.y + 2) || !currentMap.collisionAt(this.x + 1, this.y + 2)) {
            this.y++;
          } else {
            this.vy = 0;
            break;
          }
        }
      } else if (this.vy < 0) {
        for (var i = 0; i < Math.floor(-this.vy); i++) {
          if (!currentMap.collisionAt(this.x, this.y - 1) || !currentMap.collisionAt(this.x + 1, this.y - 1)) {
            this.y--;
          } else {
            this.vy = 0;
            break;
          }
        }
      }

      /* Update the trail */
      if (this.trail.length < this.maximumTrailLength) {
        this.trail.push([this.x, this.y]);
      } else {
        for (var i = 0; i < this.trail.length - 1; i++) {
          this.trail[i] = this.trail[i + 1];
        }

        this.trail[this.trail.length - 1] = [this.x, this.y];
      }

      /* Check if player is out of screen, and kill player if he hits 'r' */
      if (isOutsideOfScreen(this.x, this.y) || currentMap.tileAt(this.x, this.y) == "red" || isDown("r")) {
        this.kill();
      }

      /* Check for collisions with game objects */
      var currentCollision = currentMap.tileAt(this.x, this.y);

      if (currentCollision == "coin") {
        this.coins++;
        this.coinsOnCurrentLevel++;

        currentMap.changeTileAt(this.x, this.y, "null");
      } else if (currentCollision == "key") {
        this.hasKey = true;
        currentMap.changeTileAt(this.x, this.y, "null");
      } else if (currentCollision == "door") {
        if (this.hasKey) {
          maximumDeathsPerLevel = Math.max(maximumDeathsPerLevel, this.deathsOnCurrentLevel);
          this.deathsOnCurrentLevel = 0;

          currentMapNumber++;

          localStorage["levelReached"] = currentMapNumber.toString();
          localStorage["maximumDeathsPerLevel"] = maximumDeathsPerLevel.toString();
          localStorage["coinsCaught"] = this.coins;
          localStorage["numberOfDeaths"] = numberOfDeaths;

          if (currentMapNumber == 15) {
            return switchState(new Statistics(this));
          } else if (currentMapNumber == 30) {
            return switchState(new FinalStatistics(this));
          }

          currentMap = maps[currentMapNumber];
          currentMap.reset();
          this.reloadVariables();
        }
      }
    },

    draw: function() {
      drawRectangle(this.x, this.y, 2, 2, "#00F");

      for (var i = 0; i < this.trail.length; i++) {
        drawRectangle(this.trail[i][0], this.trail[i][1], 2, 2, "#00" + Math.floor(77 / 2 - this.trail.length / 2 + (this.trail.length - i) * 7).toString(16) + "FF");
      }

      drawCircle(630, 33, 4, "#FED85D");

      currentFont = "15px pixel";

      if (currentMapNumber < 15)
        drawString(this.coins.toString() + "/" + numberOfNormalCoins.toString(), 625, 40, "#FED85D", "right");
      else
        drawString(this.coins.toString() + "/" + numberOfRedCoins.toString(), 625, 40, "#FED85D", "right");
    },

    kill: function() {
      var player = this;

      player.vx = 0;
      player.vy = 0;
      player.canUpdate = false;
      
      setTimeout(function() {
        currentMap.reset();
        player.coins -= player.coinsOnCurrentLevel;
        player.reloadVariables();

        numberOfDeaths++;
        player.deathsOnCurrentLevel++;
      }, 300);
    }
  };

  return constructor;
})();
