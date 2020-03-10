window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let frames = 0;
    let myObstacles = [];

    let backgroundImg = new Image();
    backgroundImg.src = "./img/background1.png";

    let obstacle = new Image();
    obstacle.src = "./img/rock.png";

    let playerImg = new Image();
    playerImg.src = "./img/player1.png";
    
    let health = 100;
  
    class Player {
      constructor (x,y,health){
        this.x = x;
        this.y = y;
        this.speedX = 0;
          this.speedY = 0;
          this.health = health;
      }
    
  
      update(ctx){
        
          ctx.drawImage(playerImg,this.x, this.y, 90, 140);
      }
  
      newPosition() {
        this.x += this.speedX;
        this.y += this.speedY;
      }
    }
  

    class Stone {

        constructor(width, heigth, x, y) {
            this.width = width;
            this.height = heigth;
          
            this.x = x;
            this.y = y;
            this.strength = 10;

        }
    
        // left() {
        //     return this.x;
        //   }
        //   right() {
        //     return this.x + this.width;
        //   }
        //   top() {
        //     return this.y;
        //   }
        //   bottom() {
        //     return this.y + this.height;
        //   }
        
        //   crashWith(obstacle) {
        //     return !(
        //       this.bottom() < obstacle.top() ||
        //       this.top() > obstacle.bottom() ||
        //       this.right() < obstacle.left() ||
        //       this.left() > obstacle.right()
        //     );
        //   }

  
        update(ctx) {
           
        ctx.drawImage(obstacle, this.x, this.y, 80,80);
        
        }
    
  
      newPosition() {
        this.x += this.speedX;
        this.y += this.speedY;
      }
    }
  
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
  
    function draw(){
      ctx.clearRect(0, 0, 700, 500);
      ctx.drawImage(backgroundImg, 0, 0, 700, 500);
      player.update(ctx);
      
    }
  
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
    
      checkGameOver();
    }
  

    function checkGameOver() {

        if (health <= 0) {
          drawGameOver();
        }
      }


    function crashed() {
        if(obstacle.y + 10 == player.y - 10){
            player.health -= obstacle.strength;
            console.log(player.health)
        }
        else {
            console.log("not")
        }
        }

    function startGame() {
        
      window.requestAnimationFrame(updateGameFrame);
    }
  };