function LoadingState() {
  this.setup = function() {    
    this.percentage = 0.00;

    for (var i = 1; i <= numberOfMaps; i++) {
      maps.push(new Map(i));
    }
  }

  this.update = function() {
    if (Math.floor(Math.random() * 1) == 0) {
      this.percentage += 0.01;
    }

    if (this.percentage > 1.1) {
      switchState(new TitleState());
    }
  }

  this.draw = function() {
    clearCanvas();

    context.strokeStyle = "#FFF";
    context.fillStyle = "#FFF";
    context.lineWidth = 1.2
    context.strokeRect(640 / 4, 480 / 2, 640 / 2, 20);

    if (this.percentage >= 0.98)
      context.fillRect(640 / 4 + 2, 480 / 2 + 2, 640 / 2 - 4, 20 - 4);
    else
      context.fillRect(640 / 4 + 2, 480 / 2 + 2, this.percentage * (640 / 2 - 2), 20 - 4);

    currentFont = "20px pixel";
    drawString("FAKE LOADING", 320, 300, "#FFF", "center");

    drawRectangle(0, 0, 800, 640, "#000");
  }
}
