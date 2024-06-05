import GameBoard from "./gameboard.js";
import Egg from "./egg.js";
import Snake from "./snake.js";
import EndGame from "./endgame.js";
import { getSettingValues, pauseGame } from "./utilities.js";

//DOM variables
import {
  gameBoard,
  scoreTag,
  highScoreTag,
  settingsInputs,
  settingsLabelvalues,
  saveBtn,
  pauseScreen,
  pauseBtn,
} from "./DOM_variables.js";

let newGameBoard = new GameBoard(gameBoard);
let egg = new Egg(gameBoard);
let snake = new Snake(gameBoard);
let endgame = new EndGame();

let gameMusic = new Audio("../audio/gameMusic.mp3");
let eatSound = new Audio("../audio/eat.mp3");

gameMusic.loop = true;

let gameSettingsValues = getSettingValues(settingsLabelvalues, settingsInputs);
let halfBoardSize = Math.round(gameSettingsValues["stage size"] / 2);
let snakeBody = [
  {
    x: 3,
    y: halfBoardSize,
  },
  {
    x: 4,
    y: halfBoardSize,
  },
  {
    x: 5,
    y: halfBoardSize,
  },
  {
    x: 6,
    y: halfBoardSize,
  },
];
let isPaused = false;
let xVel = 1;
let yVel = 0;
let currentDirection = "ArrowRight";
let moveInerval;
let score = 0;

window.addEventListener("resize", resizeGameBoard);
saveBtn.addEventListener("click", setGameSettings);
window.addEventListener("keyup", (e) => {
  if (e.keyCode == 32) {
    isPaused = pauseGame(
      gameBoard,
      pauseScreen,
      isPaused,
      pauseBtn,
      gameSettingsValues["stage size"]
    );
    if (isPaused) {
      gameMusic.pause();
      clearInterval(moveInerval);
    } else {
      gameMusic.play();
      updateSnake();
    }
  } else if (e.keyCode >= 37 && e.keyCode <= 40) {
    currentDirection = e.key;
  } else if (isPaused) {
    alert("press space bar to start!");
  }
});
pauseBtn.addEventListener("click", (e) => {
  isPaused = pauseGame(
    gameBoard,
    pauseScreen,
    isPaused,
    pauseBtn,
    gameSettingsValues["stage size"]
  );
  if (isPaused) {
    clearInterval(moveInerval);
  } else {
    updateSnake();
  }
});

newGameBoard.changeGameSettings(gameBoard, gameSettingsValues);

function startGame() {
  resizeGameBoard();
  createEgg(snakeBody);
  drawSnake();
  endgame.displayHighScore(highScoreTag);
  setGameSettings(false);
  isPaused = pauseGame(
    gameBoard,
    pauseScreen,
    isPaused,
    pauseBtn,
    gameSettingsValues["stage size"],
    "START"
  );
}

function updateSnake() {
  clearInterval(moveInerval);
  moveInerval = setInterval(() => {
    let vel = snake.checkDirection(currentDirection, xVel, yVel);
    xVel = vel[0];
    yVel = vel[1];
    moveSnake();
    snakeBody[snakeBody.length - 1].x += xVel;
    snakeBody[snakeBody.length - 1].y += yVel;
    endgame.checkEndGame(snakeBody, score, gameSettingsValues, gameMusic)
      ? clearInterval(moveInerval)
      : false;
    if (isEggEaten()) {
      eatSound.play();
      for (let i = 0; i < gameSettingsValues["grow rate"]; i++) {
        setTimeout(() => {
          snake.growSnake(snakeBody, xVel, yVel);
        }, Math.round(200 + 200 * i));
      }
      score++;
      scoreTag.innerHTML = score;
    }
    drawSnake();
    newGameBoard.changeGameSettings(gameBoard, gameSettingsValues);
  }, 500 / gameSettingsValues["speed"]);
}

function resizeGameBoard() {
  let screenSize = Math.min(Math.min(screen.height, screen.width), 500);
  newGameBoard.changeBoardSize(screenSize);
}

function setGameSettings(e) {
  if (e) {
    e.preventDefault();
    alert("settings saved");
  }
  gameSettingsValues = getSettingValues(settingsLabelvalues, settingsInputs);
  newGameBoard.changeGameSettings(gameBoard, gameSettingsValues);
}

function createEgg() {
  egg.changeEggPosition(gameSettingsValues["stage size"]);
}

function drawSnake() {
  snake.createSnake(snakeBody);
}

function isEggEaten() {
  return egg.isEggEaten(
    snakeBody[snakeBody.length - 1].x,
    snakeBody[snakeBody.length - 1].y,
    gameSettingsValues["stage size"],
    snakeBody
  );
}

function moveSnake() {
  snake.moveSnake(snakeBody);
}
startGame();
