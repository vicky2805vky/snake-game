export default class EndGame {
  #losingSound = new Audio(
    "https://vicky2805vky.github.io/snake-game/audio/thud.mp3"
  );

  checkEndGame(snakeBody, score, gameSettingsValues, gameMusic) {
    if (
      snakeBody[snakeBody.length - 1].x > gameSettingsValues["stage size"] ||
      snakeBody[snakeBody.length - 1].y > gameSettingsValues["stage size"] ||
      snakeBody[snakeBody.length - 1].x <= 0 ||
      snakeBody[snakeBody.length - 1].y <= 0
    ) {
      gameMusic.pause();
      return this.displayGameOver(score);
    } else {
      for (let i = 0; i < snakeBody.length - 1; i++) {
        if (
          snakeBody[snakeBody.length - 1].x == snakeBody[i].x &&
          snakeBody[snakeBody.length - 1].y == snakeBody[i].y
        ) {
          gameMusic.pause();
          return this.displayGameOver(score);
        }
      }
    }
    return false;
  }
  displayGameOver(score) {
    this.#losingSound.play();
    if (confirm("GAME OVER, do you want to play again?")) {
      window.location.reload();
      if (localStorage.getItem("highScore")) {
        if (localStorage.getItem("highScore") < score) {
          localStorage.setItem("highScore", score);
        }
      } else {
        localStorage.setItem("highScore", score);
      }
      localStorage.setItem("highScore", score);
    }
    return true;
  }
  displayHighScore(highScoreTag) {
    if (localStorage.getItem("highScore")) {
      highScoreTag.innerHTML = localStorage.getItem("highScore");
    }
  }
}
