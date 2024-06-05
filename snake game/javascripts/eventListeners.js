export default function setEventListeners() {
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
        clearInterval(moveInerval);
      } else {
        updateSnake();
      }
    } else if (e.keyCode >= 37 && e.keyCode <= 40) {
      currentDirection = e.keyCode;
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
}
