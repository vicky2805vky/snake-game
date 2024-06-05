export default class Snake {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
  }

  createSnake(snakeBody) {
    this.deleteSnake();
    snakeBody.forEach((part) => {
      let snake = document.createElement("div");
      snake.classList.add("snake");
      snake.style.gridArea = `${part.y} / ${part.x}`;
      this.gameBoard.appendChild(snake);
    });
  }

  moveSnake(snake) {
    for (let i = 0; i < snake.length - 1; i++) {
      snake[i] = { ...snake[i + 1] };
    }
  }

  checkDirection(currentDirection, xVel, yVel) {
    switch (currentDirection) {
      case "ArrowLeft":
        if (!xVel) {
          xVel = -1;
          yVel = 0;
        }
        break;
      case "ArrowUp":
        if (!yVel) {
          xVel = 0;
          yVel = -1;
        }
        break;
      case "ArrowRight":
        if (!xVel) {
          xVel = 1;
          yVel = 0;
        }
        break;
      case "ArrowDown":
        if (!yVel) {
          xVel = 0;
          yVel = 1;
        }
        break;
    }
    return [xVel, yVel];
  }

  growSnake(snakeBody, xVel, yVel) {
    snakeBody.unshift({ x: snakeBody[0].x - xVel, y: snakeBody[0].y - yVel });
  }

  deleteSnake() {
    let snake = this.gameBoard.querySelectorAll(".snake");
    snake.forEach((snakePart) => {
      snakePart.remove();
    });
  }
}
