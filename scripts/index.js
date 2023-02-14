const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'white',
];

const BRICK_LAYOUT = [
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ],
];
const WHITE_COLOR_ID = 7;

const KEY_CODES = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    SPACE: 'Space',
};

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
        this.score = 0;
        this.gameOver = false;
        this.isPlaying = false;
    }

    generateWhiteBoard() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID));
    }

    drawCell(xAxis, yAxis, colorId) {
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
        this.ctx.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillStyle = 'black';
        this.ctx.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }

    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    }

    handleCompleteRows() {
        const lastesGrid = board.grid.filter((row) => {
            return row.some(col => col === WHITE_COLOR_ID);
        }); // return row full white

        const newScore = ROWS - lastesGrid.length;
        const newRows = Array.from({ length: newScore }, () => Array(COLS).fill(WHITE_COLOR_ID));

        if (newScore) {
            board.grid = [...newRows, ...lastesGrid];
            this.handleScore(newScore * 10);
        }
    }

    handleScore(newScore) {
        this.score += newScore;
        document.getElementById('score').innerHTML = this.score;
    }

    handleGameOver() {
        this.gameOver = true;
        this.isPlaying = false;
        // alert('Game over!!!');
        // var canvas = document.getElementById("gameCanvas");
        var ctx = canvas.getContext("2d");

        // Draw the game over message on the canvas
        ctx.fillStyle = "red";
        ctx.font = "bold 36px Arial";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);

        // Create the pop-up canvas
        var popup = document.createElement("div");
        popup.style.backgroundColor = "white";
        popup.style.position = "fixed";
        popup.style.left = "50%";
        popup.style.top = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.width = "400px";
        popup.style.height = "200px";
        popup.style.border = "2px solid black";

        // Add the game over message to the pop-up canvas
        var message = document.createElement("p");
        message.style.textAlign = "center";
        message.style.fontSize = "36px";
        message.innerHTML = "Game Over";
        popup.appendChild(message);

        // Create the "Play Again" button
        var playAgainButton = document.createElement("button");
        playAgainButton.style.backgroundColor = "green";
        playAgainButton.style.color = "white";
        playAgainButton.style.width = "100px";
        playAgainButton.style.height = "50px";
        playAgainButton.style.margin = "0 auto";
        playAgainButton.style.display = "block";
        playAgainButton.style.marginTop = "50px";
        playAgainButton.innerHTML = "Play Again";
        popup.appendChild(playAgainButton);
        playAgainButton.addEventListener("click", () => {
            // Write your code here to restart the game
            document.body.removeChild(popup);
            btnPlayAgain();
        });

        // Show the pop-up canvas when the game is over
        document.body.appendChild(popup);

    }

    reset() {
        this.score = 0;
        this.grid = this.generateWhiteBoard();
        this.gameOver = false;
        this.drawBoard();
    }

}


class Brick {
    constructor(id) {
        this.id = id; // id color or id block
        this.layout = BRICK_LAYOUT[id];// 7 brick
        this.activeIndex = 0; //huong
        this.colPos = 3;
        this.rowPos = -1;
    }

    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id);
                }
            }
        }
    }

    clear() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
                }
            }
        }
    }

    moveLeft() {
        if (!this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos--;
            this.draw();
        }
    }

    moveRight() {
        if (!this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos++;
            this.draw();
        }
    }

    moveDown() {
        if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
            this.clear();
            this.rowPos++
            this.draw();
            return;
        }

        this.handleLanded();
        generateNewBrick();
    }

    rotate() {
        if (!this.checkCollision(this.rowPos, this.colPos - 1, this.layout[(this.activeIndex + 1) % 4])) {

            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4;
            this.draw();
        }
    }

    checkCollision(nextRow, nextCol, nextLayout) {
        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[0].length; col++) {
                if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
                    if (col + nextCol < 0 || col + nextCol >= COLS || row + nextRow >= ROWS
                        || board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID)
                        return true;
                }
            }
        }
        return false;
    }


    handleLanded() {
        if (this.rowPos <= 0) {
            board.handleGameOver();
            return;
        }

        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.grid[row + this.rowPos][col + this.colPos] = this.id;
                }
            }
        }
        board.handleCompleteRows();
        board.drawBoard();
    }


}

function generateNewBrick() {
    brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length);
}
board = new Board(ctx);
board.drawBoard();

document.getElementById("play").addEventListener('click', () => {
    board.reset();
    board.isPlaying = true;
    generateNewBrick();
    const refresh = setInterval(() => {
        if (!board.gameOver) {
            brick.moveDown();
        } else {
            clearInterval(refresh);
        }
    }, 1000);
})

function btnPlayAgain() {
    board.reset();
    board.score = 0;
    board.handleScore(0);
    console.log(board.score);
}




document.addEventListener('keydown', (e) => {

    if (!board.gameOver && board.isPlaying) {
        switch (e.code) {
            case KEY_CODES.LEFT:
                brick.moveLeft();
                break;
            case KEY_CODES.RIGHT:
                brick.moveRight();
                break;
            case KEY_CODES.DOWN:
                brick.moveDown();
                break;
            case KEY_CODES.SPACE:
                brick.rotate();
                break;
            case KEY_CODES.UP:
                brick.rotate();
                break;
            default:
                break;
        }
    }
})