function PlayState() {
  this.setup = function() {
    this.player = new Player();
  }

  this.update = function() {
    this.player.update();
  }

  this.draw = function() {
    clearCanvas();

    currentMap.draw();
    this.player.draw();

    currentFont = "15px pixel";
    if (currentMapNumber < 15)
      drawString((currentMapNumber + 1).toString() +  "/15", 635, 20, "#000", "right");
    else
      drawString((currentMapNumber + 1 - 15).toString() +  "/15", 635, 20, "#000", "right");

    drawRectangle(0, 0, 800, 640, "#A9A9A9");
  }
}
