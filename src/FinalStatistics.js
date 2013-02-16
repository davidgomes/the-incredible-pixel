function FinalStatistics(player) {
  this.player = player;
  currentMapNumber = 0;
  
  this.setup = function() { }

  this.update = function() { }

  this.draw = function() {
    clearCanvas();

    currentFont = "40px pixel";
    drawString("The Real End", 320, 70, "#FFF", "center");

    currentFont = "15px pixel";
    drawString(numberOfDeaths.toString() + " times killed.", 320, 120, "#FFF", "center");
    drawString((numberOfDeaths / 15).toFixed(2).toString() + " deaths per level.", 320, 150, "#FFF", "center");
    drawString(this.player.coins.toString() + " coins caught.", 320, 180, "#FFF", "center");
    drawString(((this.player.coins / numberOfRedCoins).toFixed(4) * 100).toString() + "% of coins caught.", 320, 210, "#FFF", "center");
    drawString(maximumDeathsPerLevel.toString() + " was the highest number of deaths in a level.", 320, 240, "#FFF", "center");

    currentFont = "30px pixel";
    drawString("Thank you for playing!", 320, 460, "#FFF", "center");

    drawRectangle(0, 0, context.width, context.height, "#000");
  }
}
