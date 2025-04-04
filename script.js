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
    }

    function makeMove(index) {
        if (gameOver) return;

        if (Gameboard.setCell(index, currentPlayer.symbol)) {
            const winner = checkWinner();
            if (winner) {
                console.log(winner === "Tie" ? "It's a tie!" : `${winner} wins!`);
                gameOver = true;
            } else {
                switchTurn(); 
            }
        }
    }

    function checkWinner() {
        const board = Gameboard.getBoard();

        for (let i = 0; i < 3; i++) {
            if (board[i * 3] && board[i * 3] === board[i * 3 + 1] && board[i * 3 + 1] === board[i * 3 + 2]) {
                return board[i * 3]; 
            }
        }
        
        for (let i = 0; i < 3; i++) {
            if (board[i] && board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
                return board[i];
            }
        }

        if (board[0] && board[0] === board[4] && board[4] === board[8]) {
            return board[0]; 
        }
        if (board[2] && board[2] === board[4] && board[4] === board[6]) {
            return board[2]; 
        }

        if (!board.includes("")) {
            return "Tie";
        }

        return null; 
    }

    return { makeMove, resetGame: Gameboard.resetBoard };
}

function renderBoard() {
    const valori = Gameboard.getBoard();
    const cells = document.querySelectorAll(".game > div");
    
    for (let i = 0; i < valori.length; i++) {
        cells[i].textContent = valori[i];

        cells[i].addEventListener("click", function() {
            if (valori[i] === "") {
                makeMove(i);
                renderBoard();
                switchTurn();
            }
        });
    }
}
