window.onload = function () {

    // Variables
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var canvasW = canvas.width;
    var canvasH = canvas.height;

    //Snake
    var snakeW = 20;
    var snakeH = 20;
    var snakeLen = 4;
    var snake = [];

    //Default direction
    var direction = "RIGHT";



    function drawSnake(x, y) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(x*snakeW, y*snakeH, snakeW, snakeH);

        ctx.fillStyle = "#000";
        ctx.strokeRect(x*snakeW, y*snakeH, snakeW, snakeH);
    }

    //Create snake
    for (var i = snakeLen - 1; i>=0; i--){
        snake.push( {x:i, y:0} );
    }

    function draw(){
        ctx.clearRect(0, 0, canvasW, canvasH)
        for(var i = 0; i < snake.length; i++){
            var x = snake[i].x;
            var y = snake[i].y;
            drawSnake(x, y);
        }

        //Snake head
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        //remove last item (Tail of the snake)
        snake.pop();

        //create new head
        if(direction == "LEFT") snakeX--;
        else if(direction == "TOP") snakeY--;
        else if(direction == "RIGHT") snakeX++;
        else if(direction == "DOWN") snakeY++;

        var newSnakeHead = {
            x : snakeX,
            y : snakeY
        }

        snake.unshift(newSnakeHead);
    }
    setInterval(draw, 200);
}