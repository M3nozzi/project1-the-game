window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    };    //START THE GAME BEFORE CLICK ON THE BUTTON

    
    //CANVAS

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let frames = 0;
    let gameIsRunning = true;
    let myObstacles = [];

    //IMAGES 

    let backgroundImg = new Image();
    backgroundImg.src = "./img/background1.png";

    let obstacle = new Image();
    obstacle.src = "./img/rock.png";

    let playerImg = new Image();
    playerImg.src = "./img/player1.png";
    
    let health = 100;



    //PLAYER SESSION


    class Player {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.speedX = 0;
            this.speedY = 0;
            this.health = 100;
        }
    
        receiveDamage() {
        
            this.health -=10;
        }
        
        
        update(ctx) {
        
            ctx.drawImage(playerImg, this.x, this.y, 90, 140);
        }
  
        newPosition() {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
  
    // //CHANGE BACKGROUND


    // function backgroundChange() {
    //     if (frames <= 2000) {
    //         let backgroundImg = new Image();
    //         backgroundImg.src = "./img/background2.jpg";
    //     } else if (frames <= 3000) {
    //         let backgroundImg = new Image();
    //         backgroundImg.src = "./img/background3.jpg";
    //     } else if (frame <= 4000) {
    //         let backgroundImg = new Image();
    //         backgroundImg.src = "./img/background4.jpg";
    //     } else (frames <= 5000) 
    //         let backgroundImg = new Image();
    //         backgroundImg.src = "./img/background5.png";
        
    // }


    //OBSTACLE SESSION 

    class Stone {

        constructor(width, heigth, x, y) {
            this.width = width;
            this.height = heigth;
          
            this.x = x;
            this.y = y;
           this.strength = 10;

        }


        attack() {
        
            return damage = this.strength;
        }

        update(ctx) {
           
        ctx.drawImage(obstacle, this.x, this.y, 80,80);
        
        }
    
  
      newPosition() {
        this.x += this.speedX;
        this.y += this.speedY;
      }
    }
  

    //PLAYER CONTROLER

    let player = new Player(30,280,100);
  
    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case 65: // left a
              player.speedX -= 1;
            //   console.log('left');
            //   console.log(player.speedX)
          break;
        case 68: // right d
          player.speedX += 1;
              break;
        case 83: // down s 
          player.speedY += 1;
              break;
        case 87: // up w
        player.speedY -= 1;
        break;
        
      }
    };
    
    document.onkeyup = function(e) {
      player.speedX = 0;
      player.speedY = 0;
        
    };

    //DRAW
  
    function draw(){
      ctx.clearRect(0, 0, 700, 500);
      ctx.drawImage(backgroundImg, 0, 0, 700, 500);
      player.update(ctx);
      
    }
  
    //FALLING OBSTACLES

    function updateObstacles() {
  
      for (i = 0; i < myObstacles.length; i++) {
          myObstacles[i].y += 2;
          myObstacles[i].update(ctx);
      }
  
      frames += 1;
      if (frames % 50 === 0) {
        let randomPosition = canvas.width;
        let x = Math.floor(Math.random() * randomPosition);
        let mindWidth = 10;
        let maxWidth =  10;
        let width = Math.floor(Math.random() * (maxWidth - mindWidth + 1) + mindWidth);
        myObstacles.push(new Stone(width,10, x,0));
      }
    } 


    function updateGameFrame(){
        player.newPosition();
        draw();
        updateObstacles();

        window.requestAnimationFrame(updateGameFrame);
        checkDamage();
        checkGameOver();

        
    }
  

    //GAME OVER 

    function checkGameOver() {

        if (health <= 0) {

            drawGameOver();
          }

      }

      function drawGameOver() {
        gOverImg.src='./img/gameoverpng';
        context.drawImage(gOverImg, 350, 250);
      }
    
    let  checkDamage = () => {
        let playerX = player.x; 
        let playerY = player.y;
        let playerXW = player.x + player.width;
        let playerYH = player.y + player.height;
      
       
        for (let i = 0; i < myObstacles.length; i++) {
          let obstacleX = myObstacles[i].positionX;
          let obstacleY = myObstacles[i].positionY;
          let obstacleXW = myObstacles[i].positionX + obstacle[i].width;
          let obstacleYH = myObstacles[i].positionY + obstacle[i].height;
      
          if (playerXW > obstacleX && playerX < obstacleXW && playerYH > obstacleY && playerY < obstacleYH) {
            
              player.receiveDamage();
              
          }
        }
      };


    //START GAME

    function startGame() {
        
        window.requestAnimationFrame(updateGameFrame);
        

    }
  };