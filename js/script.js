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

    //Listening direction change
    document.addEventListener("keydown", getDirection);

    function getDirection(e){
        if(e.keyCode == 39 &&  direction != "LEFT"){
            direction = "RIGHT";
        } else if (e.keyCode == 38 &&  direction != "DOWN"){
            direction = "TOP";
        } else if (e.keyCode == 37 &&  direction != "RIGHT"){
            direction = "LEFT";
        } else if (e.keyCode == 40 &&  direction != "TOP"){
            direction = "DOWN";
        }
    }

    //When snake kiss self (body) GAME OVER
    function kissSelf(head,array){
        for(var i = 0; i < array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y){
                return true;
            }
        }
        return false;
    }

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
    //Create food
    var  food = {
        x : Math.floor(Math.random()*(canvasW / snakeW - 1)+1),
        y : Math.floor(Math.random()*(canvasH / snakeH - 1)+1)
    }

    function drawFood(x, y) {
        ctx.fillStyle = "#34ff4c";
        ctx.fillRect(x*snakeW, y*snakeH, snakeW, snakeH);

        ctx.fillStyle = "#000";
        ctx.strokeRect(x*snakeW, y*snakeH, snakeW, snakeH);
    }

    //Draw element into canvas
    function draw(){
        ctx.clearRect(0, 0, canvasW, canvasH)
        for(var i = 0; i < snake.length; i++){
            var x = snake[i].x;
            var y = snake[i].y;
            drawSnake(x, y);
        }
        //DrawFood function execution
        drawFood(food.x, food.y);

        //Snake's head
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        //snake its the
        if(snakeX == food.x && snakeY == food.y){
            food = {
                x : Math.floor(Math.random()*(canvasW / snakeW - 1)+1),
                y : Math.floor(Math.random()*(canvasH / snakeH - 1)+1)
            }
        }else {
            snake.pop();
        };

        //create new head
        if(direction == "LEFT") snakeX--;
        else if(direction == "TOP") snakeY--;
        else if(direction == "RIGHT") snakeX++;
        else if(direction == "DOWN") snakeY++;

        var newSnakeHead = {
            x : snakeX,
            y : snakeY
        }

        //Game over if snake kiss the wall or self =)
        if (snakeX < 0 || snakeY < 0 || snakeX >= canvasW/snakeW || snakeY >= canvasH/snakeH || kissSelf(newSnakeHead,snake)){
            location.reload();
        }
        //Add new item to start of array
        snake.unshift(newSnakeHead);
    }
    setInterval(draw, 100);
}