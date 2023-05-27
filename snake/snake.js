// Initial state of the snake in the middle of the game board
var snake = [{ top: 40, left: 40 }];

// Initial state of the apple, which is null until placed on the board
var apple = null;

// Initial score
var score = 0;

// Function to create the game board
function createGameBoard() {
    // Clear the game board
    document.getElementById('game-board').innerHTML = '';

    // Create a div for each dot in the snake array
    snake.forEach(function (dot, index) {
        var dotElement = document.createElement('div');
        dotElement.className = 'dot';
        dotElement.style.left = `${dot.left}vmin`;
        dotElement.style.top = `${dot.top}vmin`;
        document.getElementById('game-board').appendChild(dotElement);
    });

    // Create a new apple if there isn't one already
    if (apple === null) {
        apple = { top: 2 * Math.floor(Math.random() * 40), left: 2 * Math.floor(Math.random() * 40) };
    }
    // Create a div for the apple
    var appleElement = document.createElement('div');
    appleElement.className = 'apple';
    appleElement.style.left = `${apple.left}vmin`;
    appleElement.style.top = `${apple.top}vmin`;
    document.getElementById('game-board').appendChild(appleElement);
}

// Function to check if the snake has collided with the wall or itself
function checkCollision() {
    // Check if the snake's head has hit the wall
    if (snake[0].top < 0 || snake[0].left < 0 || snake[0].top >= 80 || snake[0].left >= 80) {
        return true;
    }
    // Check if the snake's head has hit its body
    for (var i = 1; i < snake.length; i++) {
        if (snake[i].top === snake[0].top && snake[i].left === snake[0].left) return true;
    }
    return false;
}

// Initial direction of the snake's movement
var direction = 'right';

// Function to move the snake in the current direction
function moveSnake() {
    var head = Object.assign({}, snake[0]); // copy head

    // Move the head in the current direction
    switch (direction) {
        case 'right':
            head.left += 2;
            break;
        case 'down':
            head.top += 2;
            break;
        case 'left':
            head.left -= 2;
            break;
        case 'up':
            head.top -= 2;
            break;
    }
    // Add the new head to the snake
    snake.unshift(head);

    // Check if the snake's head is at the same position as the apple
    if (snake[0].top === apple.top && snake[0].left === apple.left) {
        apple = null;
        score++;
        document.getElementById('score').innerText = "Score: " + score;
    } else {
        snake.pop();
    }

    // If the snake has collided, reset the game
    if (checkCollision()) {
        snake = [{ top: 40, left: 40 }];
        score = 0;
        document.getElementById('score').innerText = "Score: " + score;
        direction = 'right';
    }
}

// Event listener for keyboard inputs
window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
    }
});

// Touch events for mobile inputs
var initialX = null;
var initialY = null;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {
    if (initialX === null || initialY === null) {
        return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Sliding horizontally
        if (diffX > 0) {
            // Swiped left
            direction = 'left';
        } else {
            // Swiped right
            direction = 'right';
        }  
    } else {
        // Sliding vertically
        if (diffY > 0) {
            // Swiped up
            direction = 'up';
        } else {
            // Swiped down
            direction = 'down';
        } 
    }

    initialX = null;
    initialY = null;

    e.preventDefault();
};

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("touchstart", startTouch, false);
    document.addEventListener("touchmove", moveTouch, false);
});

// Interval to continuously create the game board and move the snake
setInterval(function() {
    createGameBoard();
    moveSnake();
}, 200);