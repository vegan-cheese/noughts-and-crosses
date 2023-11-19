// Player represented as (false = crosses) and (true = noughts)
let currentPlayer = true;

let gameOver = false;
let winner = -1

// In grid, -1 is blank, 0 is crosses and 1 is noughts
const grid = [
    -1, -1, -1,
    -1, -1, -1,
    -1, -1, -1
];

const messageBox = document.getElementById("messageBox");
const currentPlayerDisplay = document.getElementById("currentPlayer");
const gridDisplay = document.getElementById("gridContainer");

function updateGridDisplay() {
    for (let index = 0; index < 9; index++) {
        const gridSquare = document.getElementById("square" + String(index));
        if (grid[index] == 0) {
            gridSquare.textContent = "X";
        } else if (grid[index] == 1) {
            gridSquare.textContent = "O";
        }
        else {
            gridSquare.textContent = "";
        }
    }
}

function hasPlayerWon() {
    let playerNumber = Number(currentPlayer);

    let horizontal1 = grid[0] == playerNumber && grid[1] == playerNumber && grid[2] == playerNumber;
    let horizontal2 = grid[3] == playerNumber && grid[4] == playerNumber && grid[5] == playerNumber;
    let horizontal3 = grid[6] == playerNumber && grid[7] == playerNumber && grid[8] == playerNumber;
    let vertical1 = grid[0] == playerNumber && grid[3] == playerNumber && grid[6] == playerNumber;
    let vertical2 = grid[1] == playerNumber && grid[4] == playerNumber && grid[7] == playerNumber;
    let vertical3 = grid[2] == playerNumber && grid[5] == playerNumber && grid[8] == playerNumber;
    let diagonal1 = grid[0] == playerNumber && grid[4] == playerNumber && grid[8] == playerNumber;
    let diagonal2 = grid[2] == playerNumber && grid[4] == playerNumber && grid[6] == playerNumber;
    let draw = true
    for (let index = 0; index < 9; index++) {
        if (grid[index] == -1) {
            draw = false;
        }
    }

    if (horizontal1 || horizontal2 || horizontal3 || vertical1 || vertical2 || vertical3 || diagonal1 || diagonal2) {
        winner = Number(currentPlayer);
        return true;
    } else if (draw) {
        winner = -1;
        return true;
    } else {
        return false;
    }
}

function squareClicked(gridIndex) {
    if (gameOver) {
        return 1;
    }

    if (grid[gridIndex] != -1) {
        // Message that this box is already full
        messageBox.textContent = "This square is already full! Try Again";
        messageBox.style.display = "block";
        return 1;
    }

    grid[gridIndex] = Number(currentPlayer);
    updateGridDisplay();

    gameOver = hasPlayerWon();
    if (gameOver && winner == -1) {
        messageBox.textContent = "Draw! Reload the page to restart";
        messageBox.style.display = "block";
    } else if (gameOver && winner == 0) {
        messageBox.textContent = "Crosses wins! Reload the page to restart";
        messageBox.style.display = "block";
    } else if (gameOver && winner == 1) {
        messageBox.textContent = "Noughts wins! Reload the page to restart";
        messageBox.style.display = "block";
    } else {
        currentPlayer = !currentPlayer;

        if (currentPlayer == true) {
            currentPlayerDisplay.textContent = "Current Player: Noughts";
            currentPlayerDisplay.style.color = "#90ff90";
            messageBox.style.backgroundColor = "#90ff90";
        }
        else {
            currentPlayerDisplay.textContent = "Current Player: Crosses";
            currentPlayerDisplay.style.color = "#ff9090";
            messageBox.style.backgroundColor = "#ff9090";
        }
    }
}