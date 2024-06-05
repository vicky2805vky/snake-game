export default class GameBoard {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
  }

  changeBoardSize(screenSize) {
    let roundedSize = Math.floor(screenSize / 100) * 100;
    roundedSize -= 75;
    this.gameBoard.style.height = roundedSize + "px";
    this.gameBoard.style.width = roundedSize + "px";
  }

  changeGameSettings(gameBoard, settings) {
    let snake = gameBoard.querySelectorAll(".snake");
    let egg = gameBoard.querySelector(".egg");

    gameBoard.style.gridTemplateColumns = `repeat(${settings["stage size"]},1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${settings["stage size"]},1fr)`;
    gameBoard.style.background = settings["background"];

    snake.forEach(
      (snakepart) => (snakepart.style.background = settings["snake color"])
    );

    egg.style.backgroundColor = settings["egg color"];
    egg.style.color = settings["egg color"];

    let clipPath = this.#snakeShapeFinder(settings["snake shape"]);
    this.#snakeShapeChanger(snake, clipPath);
  }

  #snakeShapeFinder(shapeCode) {
    switch (shapeCode) {
      case 0:
        return "inset(5% 20% 15% 10%)";

      case 1:
        return "circle(40%)";

      case 2:
        return "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)";

      case 3:
        return "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

      case 4:
        return "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)";

      case 5:
        return "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)";
    }
  }

  #snakeShapeChanger(snake, clipPath) {
    snake.forEach((snakepart) => (snakepart.style.clipPath = clipPath));
  }
}
