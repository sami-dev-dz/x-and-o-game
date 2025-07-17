document.addEventListener("DOMContentLoaded", function () {
      let i = 0; 
const cells = document.querySelectorAll(".cell");
const status = document.querySelector(".status");
const btn = document.querySelector(".reset-btn");

btn.addEventListener("click", () => {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.removeAttribute("data-value");
  });
  status.textContent = "Player X's turn";
  i = 0;
});

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const currentPlayer = i === 0 ? "1" : "2";

    if (cell.textContent === "" && !winner("1") && !winner("2")) {
      cell.textContent = currentPlayer === "1" ? "X" : "O";
      cell.style.color = currentPlayer === "1" ? "red" : "blue";
      cell.setAttribute("data-value", currentPlayer);

      if (winner(currentPlayer)) {
  status.textContent = currentPlayer === "1" ? "🎉 Player X won!" : "🎉 Player O won!";
} else if (isDraw()) {
  status.textContent = "🤝 It's a draw!";
} else {
  status.textContent = currentPlayer === "1" ? "Player O's turn" : "Player X's turn";
  i = 1 - i;
}
    }
  });
});

function isDraw() {
  return [...cells].every(cell => cell.getAttribute("data-value")) &&
         !winner("1") && !winner("2");
}


function winner(player) {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // lines
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winCombos.some(combo => {
    return combo.every(i => {
      return cells[i].getAttribute("data-value") === player;
    });
  });
}
});