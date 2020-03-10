window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    };    //START THE GAME BEFORE CLICK ON THE BUTTON

    
    //CANVAS

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let frames = 0;
    let myObstacles = [];

    //IMAGES 

    let backgroundImg = new Image();
    // backgroundImg.src = "./img/background1.png";

    let obstacle = new Image();
    obstacle.src = "./img/rock.png";

    let playerImg = new Image();
    playerImg.src = "./img/player1.png";


    let barbarianImg = new Image();
    barbarianImg.src = './img/barbarian.png';

    //PLAYER SESSION


    class Player {
        constructor(x, y, health) {
            this.x = x;
            this.y = y;
            this.speedX = 0;
            this.speedY = 0;
            this.health = health;
            this.strength = 20;
        }

        attack(){
            return this.strength;
        }
    
        receiveDamage() {
        
            this.health = this.health - 1;
            console.log('pedraaa');
        }
        
        
        update(ctx) {
        
            ctx.drawImage(playerImg, this.x, this.y, 90, 140);
        }
  
        newPosition() {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }

     //BARBARIAN

    class Barbarian {
        constructor(x, y,health) {
            this.x = x;
            this.y = y;
            this.speedX = 4;
            this.speedY = 0;
            this.health = health;
            this.strength = 10;
        }
    
        receiveDamage() {
        
            this.health = this.health - 20;
            
        }

        attack(){
            return this.strength;
        }
        
        
        update(ctx) {

            ctx.drawImage(barbarianImg, this.x, this.y, 120, 200);
        }
  
        newPosition() {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }

   
  
    // //CHANGE BACKGROUND

    

    function backgroundChange() {
        
        if (frames <= 100) {
            
            
         return   backgroundImg.src = "./img/background1.png";
        } else if (frames > 100 && frames < 299) {
           
            
            backgroundImg.src = "./img/background3.jpg";
        } else if (frames >= 300 && frames < 399) {
           
            
            backgroundImg.src = "./img/background4.jpg";
        } else if (frames >= 400 &&  frames < 499) {
           
            
            backgroundImg.src = "./img/background5.png";
        } else if (frames === 500) {
            
            frames = 0;
        }
    }



   

    //OBSTACLE SESSION 

    class Stone {

        constructor(width, heigth, x, y) {
            this.width = width;
            this.height = heigth;
          
            this.x = x;
            this.y = y;
           this.strength = 10;

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

    let player = new Player(30, 280,5);
    
    let barbarian = new Barbarian(600, 250, 60);
  
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
      barbarian.update(ctx);
      
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
        fight();
        updateObstacles();
        backgroundChange()
        window.requestAnimationFrame(updateGameFrame);
        checkQuest();
        checkDamage();
        checkGameOver();

        
    }
  

    //BATTLE

    function fight() {
        if(barbarian.x + 10 == player.x - 10){
            player.health -= barbarian.strength
            console.log(player.health)
        } 
        else {
            // console.log("not attack")
        }
        }

    //GAME OVER 

    function checkGameOver() {

        if (player.health <= 0) {
            window.cancelAnimationFrame(updateGameFrame);
            // console.log(player.health)
            drawGameOver();
          }

    }

    function drawGameOver() {
        let gOverImg = new Image();
        gOverImg.src = './img/gameover.png';
        ctx.clearRect(0, 0, 700, 500);
        ctx.drawImage(gOverImg, 90, 0);
        
      }
    
    let  checkQuest = () => {
        let playerX = player.x; 
        let playerY = player.y;
        let playerXW = player.x + 90;
        let playerYH = player.y + 140;
      
       
        for (let i = 0; i < myObstacles.length; i++) {
          let obstacleX = myObstacles[i].x;
          let obstacleY = myObstacles[i].y;
          let obstacleXW = myObstacles[i].x + 80;
          let obstacleYH = myObstacles[i].y + 80;
      
          if (playerXW > obstacleX && playerX < obstacleXW && playerYH > obstacleY && playerY < obstacleYH) {
            
              myObstacles[i].x = 0;
              myObstacles[i].y = 0;
              

            //   checkGameOver();
            //   console.log('-10 damage')
              
          }
        }
    };
    
    function checkDamage() {
        
        myObstacles.forEach((obs,idx) => {
            if (obs.x === 0 && obs.y === 0) {
                myObstacles.splice(idx,1)
                player.receiveDamage();
            }
        })

    }

    //START GAME

    function startGame() {
        
        window.requestAnimationFrame(updateGameFrame);
        

    }
};
  
