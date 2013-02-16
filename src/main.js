/* Define some global variables */
var numberOfMaps = 30;
var numberOfNormalCoins = 0;
var numberOfRedCoins = 0; // Coins in the red world
var maps = [];
var startAtMap = 0;
var currentMapNumber = startAtMap;
var currentMap = maps[currentMapNumber];
var numberOfDeaths = 0; // Not for long >:D
var maximumDeathsPerLevel = 0;

/* Position the stat.js FPS counter on the top right of the screen */
stats.domElement.style.position = "absolute";
stats.domElement.style.left = (self.innerWidth - 80).toString() + "px";
stats.domElement.style.top = "0px";

/* Set up some pentagine variables */
desiredFPS = 60;

document.onkeydown = function(evt) {
  evt = evt || window.event;
  var keyCode = evt.keyCode;

  if (keyCode >= 37 && keyCode <= 40) {
    return false;
  }
};

/* Load last level */
if (!localStorage["levelReached"]) {
  localStorage["levelReached"] = "0";
} else {
  currentMapNumber = parseInt(localStorage["levelReached"]);
  currentMap = maps[currentMapNumber];
  maximumDeathsPerLevel = parseInt(localStorage["maximumDeathsPerLevel"]);
  numberOfDeaths = parseInt(localStorage["numberOfDeaths"]);
  numberOfCoins = parseInt(localStorage["coinsCaught"]);
}

/* Load The Incredible Pixel */
switchState(new LoadingState());
