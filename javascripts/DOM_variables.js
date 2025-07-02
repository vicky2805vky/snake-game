export const gameBoard = document.getElementById("game-board");
export const settingsInputs = [
  ...document.querySelectorAll("form input"),
  document.querySelector("select"),
];
export const scoreTag = document.getElementById("score");
export const highScoreTag = document.getElementById("high-score");
export const saveBtn = document.getElementById("save-btn");
export const pauseScreen = document.getElementById("waiting-screen");

const settingsLabels = document.querySelectorAll("form label");

export let settingsLabelvalues = [];
settingsLabels.forEach((label) => {
  settingsLabelvalues.push(label.textContent);
});

export const pauseBtn = document.getElementById("pause-btn");
