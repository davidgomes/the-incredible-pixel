function Statistics(player) {
  this.player = player;
  
  this.setup = function() { }

  this.update = function() {
    if (isDown("space")) {
      currentMap = maps[currentMapNumber];

      switchState(new PlayState());
    }
  }

  this.draw = function() {
    clearCanvas();

    currentFont = "40px pixel";
    drawString("The End", 320, 70, "#FFF", "center");
    
    currentFont = "15px pixel";
    drawString(localStorage["numberOfDeaths"] + " times killed.", 320, 120, "#FFF", "center");
    drawString((parseInt(localStorage["numberOfDeaths"]) / 15).toFixed(2).toString() + " deaths per level.", 320, 150, "#FFF", "center");
    drawString(localStorage["coinsCaught"] + " coins caught.", 320, 180, "#FFF", "center");
    drawString(((parseInt(localStorage["coinsCaught"]) / numberOfNormalCoins) * 100).toFixed(2).toString() + "% of coins caught.", 320, 210, "#FFF", "center");
    drawString(localStorage["maximumDeathsPerLevel"] + " was the highest number of deaths in a level.", 320, 240, "#FFF", "center");
    
    currentFont = "30px pixel";
    drawString("Press [SPACE] to move", 320, 410, "#FFF", "center");
    drawString(" on to the Red World.", 320, 460, "#FFF", "center");

    drawRectangle(0, 0, context.width, context.height, "#000");
  }
}
