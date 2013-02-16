function TitleState() {
  this.setup = function() {
    if (startAtMap != 0)
      currentMapNumber = startAtMap;

    currentMap = maps[currentMapNumber];
  }

  this.update = function() {
    if (isDown("space")) {
      switchState(new PlayState());

      currentMap.reset();
    }
  }

  this.draw = function() {
    clearCanvas();

    currentFont = "20px pixel";
    drawString("Use the arrow keys to grab the key", 320, 100, "#FFF", "center");
    drawString("and enter through the brown door.", 320, 130, "#FFF", "center");

    currentFont = "25px pixel";
    drawString("Press [SPACE] to start playing.", 320, 300, "#FFF", "center");

    drawRectangle(0, 0, 800, 640, "#000");
  }
}
