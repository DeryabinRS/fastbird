window.onload = function() {
    var cvs = document.getElementById('canvas');
    var ctx = cvs.getContext("2d");

    var bird = new Image();
    var bg = new Image();
    var fg = new Image();
    var pipeUp = new Image();
    var pipeBottom = new Image();

    bird.src = "img/flappy_bird_bird.png";
    bg.src = "img/flappy_bird_bg.png";
    fg.src = "img/flappy_bird_fg.png";
    pipeUp.src = "img/flappy_bird_pipeUp.png";
    pipeBottom.src = "img/flappy_bird_pipeBottom.png";

    let fly_audio = new Audio();
    let score_audio = new Audio();

    fly_audio.src = "audio/fly.mp3";
    score_audio.src = "audio/score.mp3";

    let gap = 90;
    //Button
    document.addEventListener("keydown", moveUp);

    function moveUp(){
        yPos -= 25;
        fly_audio.play();
    }

    let pipe = []

    pipe[0]={
        x : cvs.width,
        y : 0
    }

    //Bird position
    let xPos = 10;
    let yPos = 150;
    let grav = 1.5;
    let score = 0;

    function draw() {
        ctx.drawImage(bg, 0, 0);

        for(var i = 0; i < pipe.length; i++){
            ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

            pipe[i].x--;
            if(pipe[i].x == 90){
                pipe.push({
                   x : cvs.width,
                   y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                });
            }

            if(xPos + bird.width >= pipe[i].x
                && xPos <= pipe[i].x + pipeUp.width
                && (yPos <= pipe[i].y + pipeUp.height
                    || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
                || yPos +bird.height >= cvs.height - fg.height){
                location.reload();
            }
            if(pipe[i].x == 5){
                score++;
                score_audio.play();
            }
        }
        ctx.drawImage(fg, 0, cvs.height - fg.height);
        ctx.drawImage(bird, xPos, yPos);

        yPos += grav;

        ctx.fillStyle = "#000";
        ctx.font = "24px Verdana";
        ctx.fillText("Score: " + score, 10, cvs.height - 20);
        requestAnimationFrame(draw);
    }

    pipeBottom.onload = draw();
}