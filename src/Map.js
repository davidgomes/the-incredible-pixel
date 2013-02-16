Map = (function() {
  function constructor(mapNumber) {
    this.width = 40;
    this.height = 30;
    this.tileSize = 16;
    this.number = mapNumber;
    
    this.tiles = [];
    this.numberOfCoins = 0;
    this.decodeTile = ["null", "wall", "coin", "key", "door", "red"];
    this.collisionOnTile = { "null": false, "wall": true, "coin": false, "key": false, "door": false, "red": false };

    this.keySprite = new Sprite("res/img/key.png", null, null);
    this.doorSprite = new Sprite("res/img/door.png", null, null);

    var mapFile = new XMLHttpRequest();
    var self = this;
    mapFile.open("GET", "res/maps/map" + mapNumber.toString() + ".txt", true);

    mapFile.onreadystatechange = function() {
      if (mapFile.readyState === 4) {
        if (mapFile.status === 200) {
          self.lines = mapFile.responseText.split("\n");
          self.loadTilesFromLines();

          if (self.number <= 15)
            numberOfNormalCoins += self.numberOfCoins;
          else
            numberOfRedCoins += self.numberOfCoins;
        }
      }
    };

    mapFile.send(null);
  }

  constructor.prototype = {
    collisionAt: function(x, y) {
      if (isOutsideOfScreen(x, y)) {
        return;
      }

      return (this.collisionOnTile[this.tiles[Math.floor(y / this.tileSize)][Math.floor(x / this.tileSize)]]);
    },

    tileAt: function(x, y) {
      return (this.tiles[Math.floor(y / this.tileSize)][Math.floor(x / this.tileSize)]);
    },

    changeTileAt: function(x, y, changeTo) {
      this.tiles[Math.floor(y / this.tileSize)][Math.floor(x / this.tileSize)] = changeTo;
    },

    reset: function() {
      this.loadTilesFromLines();
    },

    loadTilesFromLines: function() {
      /* Load tiles from lines */
      for (var y = 0; y < this.height; y++) {
        this.tiles.push([]);

        for (var x = 0; x < this.width; x++) {
          this.tiles[y][x] = this.decodeTile[this.lines[y][x]];

          if (this.tiles[y][x] == "coin") {
            this.numberOfCoins++;
          }
        }
      }

      /* Load player initial position from lines */
      this.playerX = parseInt(this.lines[30]);
      this.playerY = parseInt(this.lines[31]);
    },

    draw: function() {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var position = {"x": x * this.tileSize, "y": y * this.tileSize};

          if (this.tiles[y][x] == "wall") {
            drawRectangle(position.x, position.y, 16, 16, "#000");
          } else if (this.tiles[y][x] == "coin") {
            drawCircle(position.x + 8, position.y + 8, 4, "#FED85D");
          } else if (this.tiles[y][x] == "key") {
            this.keySprite.x = position.x;
            this.keySprite.y = position.y;

            this.keySprite.draw();
          } else if (this.tiles[y][x] == "door") {
            this.doorSprite.x = position.x;
            this.doorSprite.y = position.y;

            this.doorSprite.draw();
          } else if (this.tiles[y][x] == "red") {
            drawRectangle(position.x, position.y, 16, 16, "#F00");
          }
        }
      }
    }
  };

  return constructor;
})();
