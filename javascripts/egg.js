export default class Egg {
  #totalTiles = 20;
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
  }
  eggX = 0;
  eggY = 0;
  snakeBody = [
    {
      x: 3,
      y: this.#totalTiles / 2,
    },
    {
      x: 4,
      y: this.#totalTiles / 2,
    },
    {
      x: 5,
      y: this.#totalTiles / 2,
    },
    {
      x: 6,
      y: this.#totalTiles / 2,
    },
  ];
  #createEgg() {
    document.querySelector(".egg").remove();
    let egg = document.createElement("div");
    egg.classList.add("egg");
    return egg;
  }
  #createEggPosition() {
    this.eggX = Math.ceil(Math.random() * this.#totalTiles);
    this.eggY = Math.ceil(Math.random() * this.#totalTiles);
  }

  changeEggPosition() {
    let isValidPosition = false;
    while (!isValidPosition) {
      this.#createEggPosition();
      isValidPosition = true;
      for (let i = 0; i < this.snakeBody.length; i++) {
        if (
          this.snakeBody[i].x == this.eggX &&
          this.snakeBody[i].y == this.eggY
        ) {
          isValidPosition = false;
          break;
        }
      }
    }
    let newEgg = this.#createEgg();
    newEgg.style.gridArea = this.eggY + "/" + this.eggX;
    this.gameBoard.appendChild(newEgg);
  }
  isEggEaten(x, y, totalTiles, snakeBody) {
    this.snakeBody = snakeBody;
    this.#totalTiles = totalTiles;
    if (this.eggX == x && this.eggY == y) {
      this.changeEggPosition();
      return true;
    } else {
      return false;
    }
  }
}
