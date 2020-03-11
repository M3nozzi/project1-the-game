window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    };    //START THE GAME BEFORE CLICK ON THE BUTTON

    
    //CANVAS

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let frames = 0;
    let myObstacles = [];
    let myCoins = [];

    //IMAGES 

        //BACKGROUND IMAGE
    
    let backgroundImg = new Image();
    // backgroundImg.src = "./img/background1.png";

        //ROCK IMAGE
    
    let obstacle = new Image();
    obstacle.src = "./img/rock.png";


        //ROMAN SOLDIER IMAGE
    
    let playerImg = new Image();
    playerImg.src = "./img/player1.png";

        //BARBARIAN SOLDIER IMAGE
    
    let barbarianImg = new Image();
    barbarianImg.src = './img/barbarian.png';

        // HEALTH SYMBOL IMAGE
    
    let heartImg = new Image();
    heartImg.src = './img/heart.png';

        // COIN BONUS IMAGE
    
    let coin = new Image();
    coin.src = './img/coin.png';
    
    //AUDIOS 

    //AUDIO GAME

    const audio = new Audio();
    // audio.src = './img/xxxxxxx';
    audio.volume = 0.3;

    //AUDIO CRASHED 
    const audioStone = new Audio();
    // audioStone.src = './img/xxxxx';
    audioStone.volume = 0.2;
    
    //AUDIO BONUS COIN
    const audioCoin = new Audio();
    // audioCoin.src = './img/xxxxx';
    audioCoin.volume = 0.2;

    //AUDIO GAME OVER
    const audioGameOver = new Audio();
    // audioGameOver.src = './img/xxxxxxxx';
    audioGameOver.volume = 0.5;
    



    //ROMAN SOLDIER PLAYER SESSION
        
    class Player {
        constructor(x, y, health) {
            this.x = x;
            this.y = y;
            this.speedX = 0;
            this.speedY = 0;
            this.health = health;
            // this.strength = 20;
        }

        // attack(){
        //     return this.strength;
        // }
    

        //ROMAN SOLDIER RECEIVES DEMAGE

        receiveDamage() {
        
            // audioStone.play();
    
            this.health = this.health - 1;
            console.log('pedraaa');
        }
        
        //ROMAN SOLDIER GETS BONUS HEALTH

        receiveBonus() {

            // audioCoins.play();
        
            this.health = this.health + 5;

            console.log('$$$$$')
        
            status = this.health;
            ctx.font = '29px arial';
            ctx.fillStyle = 'black';
            ctx.fillText('Health ' + status, 200, 50);

            if (status <= 5) {
                
            ctx.font = '29px arial';
            ctx.fillStyle = 'red';
            ctx.fillText('Health ' + status, 200, 50);

            };

        }

        
    //     //HEALTH STATUS
    
    //   statusHealth() {
    //     var status = this.health;
    //     ctx.font = '29px arial';
    //     ctx.fillStyle = 'black';
    //     ctx.fillText('Health ' + status, 200, 50);
    //   };

            //UPDATE
    
        update(ctx) {
        
            ctx.drawImage(playerImg, this.x, this.y, 90, 140);
        }
  
        newPosition() {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }





     //BARBARIAN SESSION

    class Barbarian {
        constructor(x, y,health) {
            this.x = x;
            this.y = y;
            this.speedX = 4;
            // this.speedY = 0;
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
        
        if (frames <= 1000) {
            
            
            return backgroundImg.src = "./img/background1.png";
            
        } else if (frames > 1000 && frames < 2500) {
           
            
            backgroundImg.src = "./img/background2.jpg";

        } else if (frames >= 2500 && frames < 3500) {
           
            
            backgroundImg.src = "./img/background3.jpg";

        } else if (frames >= 3500 &&  frames < 4500) {
            
            backgroundImg.src = "./img/background4.jpg";

        } else if (frames >= 4500 && frames < 5000) {
            
            backgroundImg.src = "./img/background5.png";

        } else if (frames === 5000) {
            
            frames = 0;
        }
    }

        //SCORE 
    
    function score() {
    var numbers = Math.floor(frames / 10);
    ctx.font = '29px arial';
    ctx.fillStyle = 'black';
    ctx.fillText('SCORE  ' + numbers, 300, 50);
    };
  

   

    //OBSTACLES SESSION - ROCKS


    class Stone {

        constructor(width, heigth, x, y) {
            this.width = width;
            this.height = heigth;
          
            this.x = x;
            this.y = y;

        }

        update(ctx) {
           
        ctx.drawImage(obstacle, this.x, this.y, 80,80);
        
        }
    
  
      newPosition() {
        this.x += this.speedX;
        this.y += this.speedY;
      }
    }




    //THE CHARACTERS

    let player = new Player(30, 280,10);
    
    let barbarian = new Barbarian(600, 250, 60);


   

    //PLAYER CONTROLER
  
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
        // case 83: // down s 
        //   player.speedY += 1;
        //       break;
        // case 87: // up w
        // player.speedY -= 1;
        // break;
        
      }
    };
    
    document.onkeyup = function(e) {
      player.speedX = 0;
      player.speedY = 0;
        
    };

    //DRAW
  
    function draw(){
      ctx.clearRect(0, 0, 700, 500);
      ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
      player.update(ctx);
      barbarian.update(ctx);
      
    }


  
    //FALLING OBSTACLES - ROCKS

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


        //CHECK WHICH ROCKS HAS CRASHED THE ROMAN SOLDIER TO COUNT THE DAMAGE
    
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
                  
              }
            }
        };
        
    
        // COUNT THE ROCKS THAT CRASHED THE SOLDIER TO CHECK DAMAGE AND SUB THE VALUE FROM HEALTH
    
        function checkDamage() {
            
            myObstacles.forEach((obs,idx) => {
                if (obs.x === 0 && obs.y === 0) {
                    myObstacles.splice(idx,1)
                    player.receiveDamage();
                }
            })
    
        }

    
     //COINS  SESSION - BONUS HEALTH

     class Coins {

        constructor(width, heigth, x, y) {
            this.width = width;
            this.height = heigth;
          
            this.x = x;
            this.y = y;
            this.speedX = 800;
            this.speedY = 800;
        }

        update(ctx) {
           
        ctx.drawImage(coin, this.x, this.y, 20,20);
        
        }
    
  
      newPosition() {
        this.x += this.speedX;
        this.y += this.speedY;
      }
    }

   //FALLING COINS - BONUS HEALTH

   function updateCoins() {
  
    for (i = 0; i < myCoins.length; i++) {
        myCoins[i].y += 5;
        myCoins[i].update(ctx);
    }

    frames += 20;
    if (frames % 150 === 0) {
      let randomPos = canvas.width;
      let x = Math.floor(Math.random() * randomPos);
      let mindWidth = 10;
      let maxWidth =  10;
      let width = Math.floor(Math.random() * (maxWidth - mindWidth + 1) + mindWidth);
      myCoins.push(new Coins(width,10, x,0));
    }
  } 
    
    
    //CHECK IF THE SOLDIER GOT A COIN
    
    let  checkQuest2 = () => {
        let playerX = player.x; 
        let playerY = player.y;
        let playerXW = player.x + 60;
        let playerYH = player.y + 90;
      
       
        for (let i = 0; i < myCoins.length; i++) {
          let coinX = myCoins[i].x;
          let coinY = myCoins[i].y;
          let coinXW = myCoins[i].x + 40;
          let coinYH = myCoins[i].y + 40;
      
          if (playerXW > coinX && playerX < coinXW && playerYH > coinY && playerY < coinYH) {
            
              myCoins[i].x = 0;
              myCoins[i].y = 0;
              
          }
        }
    };
    

    // COUNT THE COINS THAT THE SOLDIER  HAD GOTTEN TO CHECK BONUS AND ADD THE VALUE TO HIS HEALTH STATUS

    function checkGetCoin() {
        
        myCoins.forEach((coin,i) => {
            if (coin.x === 0 && coin.y === 0) {
                myCoins.splice(i,1)
                player.receiveBonus();
            }
        })

    }

    

    // EVERYTHING HAPPENS HERE!

    function updateGameFrame(){
        player.newPosition();
        draw();
        fight();
        score();
        // statusHealth();
        updateObstacles();
        updateCoins();
        backgroundChange()
        //audio.play();
        window.requestAnimationFrame(updateGameFrame);
        checkQuest();
        checkDamage();
        checkQuest2();
        checkGetCoin();
        checkGameOver();
        
        
    }
  

    // CHANGE FALLING DAMAGE TO BONUS

    // function changeFall() {
        
    //     if()


    // };

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
    



    //START GAME

    function startGame() {
        
        window.requestAnimationFrame(updateGameFrame);
        
    };

    //GAME OVER 

    function checkGameOver() {

        if (player.health <= 0) {
            window.cancelAnimationFrame(updateGameFrame);
            drawGameOver();
          }

    };

    function drawGameOver() {
        // audio.pause();
        // audioGameOver.play();
        let gOverImg = new Image();
        gOverImg.src = './img/gameover.png';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(gOverImg, 90, 0);
        setInterval(() => {
            window.location.reload();
          }, 1500);
    };


};
  
