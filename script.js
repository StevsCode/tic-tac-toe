// Gameboard Factory
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setCell = (index, symbol) => {
        if (board[index] === "") {
            board[index] = symbol;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, setCell, resetBoard };
})();

// Player Factory
const Player = (symbol) => {
    return { symbol };
};

// GameController function
function GameController() {
    let currentPlayer = Player("X");
    let gameOver = false;

    function switchTurn() {
        currentPlayer = (currentPlayer.symbol === "X") ? Player("O") : Player("X");
        updateTurnDisplay();
    }

    function makeMove(index) {
        if (gameOver) return;

        if (Gameboard.setCell(index, currentPlayer.symbol)) {
            const winner = checkWinner();
            if (winner) {
                console.log(winner === "Tie" ? "It's a tie!" : `${winner} wins!`);
                gameOver = true;
                updateTurnDisplay(winner);
            } else {
                switchTurn();
            }
        }
    }

    function checkWinner() {
        const board = Gameboard.getBoard();

        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (!board.includes("")) {
            return "Tie";
        }

        return null;
    }

    function updateTurnDisplay(winner = null) {
        const turnDisplay = document.querySelector('.turn');
        if (winner) {
            if (winner === "Tie") {
                turnDisplay.textContent = "It's a tie!";
            } else {
                turnDisplay.textContent = `${winner} wins!`;
            }
        } else {
            turnDisplay.textContent = `It's ${currentPlayer.symbol}'s turn!`;
        }
    }

    function resetGame() {
        gameOver = false;
        Gameboard.resetBoard();
        renderBoard();
        updateTurnDisplay();
    }

    return { makeMove, resetGame, checkWinner };
}

function renderBoard() {
    const board = Gameboard.getBoard();
    const cells = document.querySelectorAll(".game > div");

    for (let i = 0; i < board.length; i++) {
        cells[i].textContent = board[i];

        cells[i].addEventListener("click", function() {
            if (board[i] === "" && !gameController.gameOver) {
                gameController.makeMove(i);
                renderBoard();
            }
        });
    }
}

document.getElementById('restart').addEventListener('click', function() {
    gameController.resetGame();
});

const gameController = GameController();
renderBoard();
