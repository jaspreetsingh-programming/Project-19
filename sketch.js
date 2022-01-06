var bat; var batImg;
var timmy; var timmyImg;
var background; backgroundImg;
var gamestate = "play";
var ground;
var gameOver;
var restart;





function preload() {
    batImg = loadImage("nein.png");
    timmyImg = loadImage("Timmy.png");
    backgroundImg = loadImage("forest.jpg")

    gameOverImg = loadImage("gameOver.png")
    restartImg = loadImage("restart.png")


}

function setup() {
    createCanvas(1200, 700);

    // background = createSprite(600,350,0,0)
    // background.addImage(backgroundImg)

    gameOver = createSprite(600, 350, 50, 50);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;

    restart = createSprite(600, 400, 50, 50);
    restart.addImage(restartImg);
    restart.scale = 0.5;





    bat = createSprite(150, 320);
    bat.addImage(batImg);

    timmy = createSprite(450, 500)
    timmy.addImage(timmyImg);




    ground = createSprite(500, 650, 1500, 50)
    ground.visible = false;





}

function draw() {
    background(200);

    bat.velocityX = timmy.velocityX;

    text("Score: " + score, 500, 50);
    console.log(getFrameRate());

    if (gameState === PLAY) {

        gameOver.visible = false;
        restart.visible = false;

        background.velocityX = -(4 + 3 * score / 100)
        //scoring
        score = score + Math.round(getFrameRate() / 60);



        if (background.x < 0) {
            background.x = background.width / 2;
        }





        if (keyDown("space") && timmy.y >= 160) {
            timmy.velocityY = -12;

        }

        timmy.velocityY = timmy.velocityY + 0.5;

        timmy.collide(ground);;
    }

    if (stone.isTouching(timmy)) {
        gameState = END;


    }

    else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;








        background.velocityX = 0;
        timmy.velocityY = 0;




        stone.velocityX = 0;


        if (mousePressedOver(restart)) {
            reset();
        }

    }



    spawnStone();
    reset();

    drawSprites();
}

function spawnStone() {

    if (frameCount % 60 === 0) {
        var stone = createSprite(700, 500, 0, 0);
        cloud.y = Math.round(random(80, 120));
        stone.addImage(stoneImg);
        stone.scale = 0.5;
        stone.velocityX = -2.95;



        stone.depth = timmy.depth;
        timmy.depth = timmy.depth + 1;


        cloudsGroup.add(cloud);
    }
}

function reset() {
    gameState = PLAY;

    score = 0;
}