const boardEl = document.getElementById("board");
const cellEls = document.querySelectorAll("#board .cell");
const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let currentTurn;

setup();

function setup() {
  boardEl.classList.remove("turn-x", "turn-o");

  for (let cell of cellEls) {
    cell.classList.remove("x", "o");
    cell.addEventListener("click", fillCell, { once: true });
  }
  currentTurn = Math.round(Math.random(0, 1)) == 1 ? "x" : "o";
  boardEl.classList.add("turn-" + currentTurn);
}

function fillCell() {
  this.classList.add(currentTurn);

  if (checkForWin()) {
    const restart = confirm(
      currentTurn.toUpperCase() + " venceu a partida! Jogar novamente?"
    );

    if (restart) setup();
  } else if (checkForDraw()) {
    const restart = confirm("A partida ficou empatada! Jogar novamente?");

    if (restart) setup();
  } else {
    currentTurn = currentTurn == "x" ? "o" : "x";
    boardEl.classList.remove("turn-o", "turn-x");
    boardEl.classList.add("turn-" + currentTurn);
  }
}

function checkForWin() {
  return combinations.some((combination) => {
    return combination.every((c) => {
      if (cellEls[c].classList.contains(currentTurn)) {
        return true;
      }

      return false;
    });
  });
}

function checkForDraw() {
  return [...cellEls].every((c) => {
    if (c.classList.contains("x") || c.classList.contains("o")) {
      return true;
    }

    return false;
  });
}
