export function getSettingValues(labels, inputs) {
  let object = {};
  let i = 0;
  labels.forEach((label) => {
    object[label] = i == 7 ? inputs[i].selectedIndex : inputs[i].value;
    i++;
  });
  return object;
}

export function pauseGame(
  gameBoard,
  screen,
  isPaused,
  pauseBtn,
  screenSize,
  message = "PAUSED"
) {
  let snake = gameBoard.querySelectorAll(".snake");
  let eggs = gameBoard.querySelectorAll(".egg");

  pauseBtn.classList.toggle("fa-pause");
  pauseBtn.classList.toggle("fa-play");

  screen.style.gridArea =
    Math.round(screenSize / 2) + "/" + Math.round(screenSize / 2);

  if (isPaused) {
    snake.forEach((snakePart) => {
      snakePart.style.display = "block";
    });
    eggs.forEach((egg) => {
      egg.style.display = "block";
    });
    screen.style.display = "none";
  } else {
    snake.forEach((snakePart) => {
      snakePart.style.display = "none";
    });
    eggs.forEach((egg) => {
      egg.style.display = "none";
    });
    screen.style.display = "flex";
    screen.textContent = message;
    return !isPaused;
  }
}
