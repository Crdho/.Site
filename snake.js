
const canvas = document.createElement('canvas');
canvas.id = "snake-bg";
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';

let w, h;
function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Snake simulation
let gridSize = 20;
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 10};
let dir = {x: 1, y: 0};
let snakeLength = 1;
let timer = 0;

function draw() {
    ctx.fillStyle = '#0f0f1c';
    ctx.fillRect(0, 0, w, h);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(food.x * gridSize, food.y * gridSize, gridSize / 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Move snake
    timer++;
    if (timer % 5 === 0) {
        const head = {x: snake[0].x, y: snake[0].y};

        // AI: move toward food
        if (head.x < food.x) dir = {x: 1, y: 0};
        else if (head.x > food.x) dir = {x: -1, y: 0};
        else if (head.y < food.y) dir = {x: 0, y: 1};
        else if (head.y > food.y) dir = {x: 0, y: -1};

        const newHead = {x: head.x + dir.x, y: head.y + dir.y};
        snake.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            snakeLength++;
            food = {
                x: Math.floor(Math.random() * (w / gridSize)),
                y: Math.floor(Math.random() * (h / gridSize))
            };
        }

        while (snake.length > snakeLength) snake.pop();

        // Game over
        if (snakeLength > 50) {
            snake = [{x: 10, y: 10}];
            food = {x: 15, y: 10};
            snakeLength = 1;
        }
    }

    // Draw snake
    ctx.fillStyle = '#66ccff';
    for (let i = 0; i < snake.length; i++) {
        let s = snake[i];
        ctx.beginPath();
        ctx.arc(s.x * gridSize, s.y * gridSize, gridSize / 3, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(draw);
}
draw();
