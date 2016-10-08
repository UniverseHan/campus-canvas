window.addEventListener("load", onPageLoadComplete, false);
window.addEventListener("unload", onGameDestroy, false);

// Player

var gameState;

var screenWidth = 320;
var screenHeight = 480;

function onPageLoadComplete() {
  var FPS = 30;
  soundSystem.AddSound("./audio/test_shoot.mp3");

  screenWidth = $("#GameCanvas").width();
  screenHeight = $("#GameCanvas").height();

  gameState = new SpriteTestScene();
  setInterval(gameLoop, 1000 / FPS);

  $("#playerControlmodeToggleButton").click(function () {
    gameState.toggleAiMode();
  });
}

function TestSoundSystem() {
  soundSystem.PlaySound("/audio/test_shoot.mp3");
}

function Update() {
  gameState.Update();
  frameCounter.countFrame();
}

function Render() {
  var theCanvas = document.getElementById("GameCanvas");
  var context = theCanvas.getContext("2d");

  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;

  screenWidth = context.canvas.width;
  screenHeight = context.canvas.height;

  diaplayBackground(context);
  gameState.Render(context);
  displayFrame(context);
}

function diaplayBackground(context) {
  context.fillStyle = "#3c3f41";
  context.fillRect(0, 0, screenWidth, screenHeight);
}

function displayFrame(context) {
  context.fillStyle = "#ffffff";
  context.font = '15px Arial';
  context.textBaseline = "top";
  context.fillText("fps : " + frameCounter.lastfps, 10, 10);
}

function gameLoop() {
  Update();
  Render();
}

function onGameDestroy() {
  if (gfwSocket) {
    gfwSocket.Disconnect();
  }
}