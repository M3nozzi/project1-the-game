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
    var numbers = 0;

  
   
    //IMAGES 

        //BACKGROUND IMAGE
    
    let backgroundImg = new Image();
    // backgroundImg.src = "./img/background1.png";

        //ROCK IMAGE
    
    let obstacle = new Image();
    obstacle.src = "./img/rock.png";


        //ROMAN SOLDIER IMAGE
    
    let playerImg = new Image();
    playerImg.src = "./img/cuphead.png";

        //BARBARIAN SOLDIER IMAGE
    
    let barbarianImg = new Image();
    // barbarianImg.src = './img/enemy.png';

        // COIN BONUS IMAGE
    
    let coin = new Image();
    coin.src = './img/coin.png';
    
    //AUDIOS 

    //AUDIO GAME

    const audio = new Audio();
    audio.src = './img/audio.mp3';
    audio.volume = 0.3;

    //AUDIO CRASHED 
    const audioStone = new Audio();
    audioStone.src = './img/audioRock.wav';
    audioStone.volume = 0.5;
    
    //AUDIO BONUS COIN
    const audioCoins = new Audio();
    audioCoins.src = './img/audioCoin.wav';
    audioCoins.volume = 0.5;

    //AUDIO GAME OVER
    const audioGameOver = new Audio();
    audioGameOver.src = './img/gameOver.mp3';
    audioGameOver.volume = 0.3;
    

    //AUDIO END
    const audioEND = new Audio();
    audioEND.src = './img/theend.mp3';
    audioEND.volume = 0.7;




      //CHANGE ENEMY 

      function enemyChange() {
        
        if (frames <= 12000) {
            
            
            return barbarianImg.src = './img/enemy.png';
            
        } else if (frames > 12000 && frames < 18000) {
           
          
            barbarianImg.src = "./img/tubaCuphead.png";

        } else if (frames >= 18000 && frames < 29000) {
           
          
            barbarianImg.src = "./img/enemyCuphead.png";

        } else if (frames >= 29000 && frames < 37000) {
           
          
            barbarianImg.src = "./img/clownCuphead.png";

        } else if (frames >= 37000) {
          
            return barbarianImg.src = './img/enemy.png';
    
        
        }
    
        
    }


    //PLAYER SESSION
        
    class Player {
        constructor(x, y, health) {
            this.x = x;
            this.y = y;
            this.speedX = 0;
            this.speedY = 0;
            this.health = health;
        }

    

        //PLAYER RECEIVES DEMAGE

        receiveDamage() {
        
            audioStone.play();
    
            this.health = this.health - 3;
            // console.log('pedraaa');
        }
        
        //PLAYER GETS BONUS HEALTH

        receiveBonus() {

            audioCoins.play();
        
            this.health = this.health +1;

            // console.log('$$$$$')
        
        }

        
        //HEALTH STATUS
    
      statusHealth() {
        var status = this.health;
        ctx.font = '29px Oxanium';
        ctx.fillStyle = 'black';
          ctx.fillText('Health ' + status, 200, 50);
          
           if (status <= 5 && status > 1) {
                
            ctx.font = '29px Oxanium';
            ctx.fillStyle = 'red';
            ctx.fillText('Health ' + status, 200, 50);

           } else if (status === 1) {
               
            ctx.font = '29px Oxanium';
            ctx.fillStyle = 'red';
            ctx.fillText('Health ' + status, 200, 50);
            ctx.font = '15px Oxanium';
            ctx.fillStyle = 'red';
            ctx.fillText('I am gonna DIE!!!!',300, 80);
          }
          
      };

        
        
        
            //UPDATE
    
        update(ctx) {
        
            ctx.drawImage(playerImg, this.x, this.y, 90, 140);
        }
  
        newPosition() {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }





     //ENEMY SESSION

    class Barbarian {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.speedX = 4;
           
           
        }    
        
        update(ctx) {

            ctx.drawImage(barbarianImg, this.x, this.y, 150, 200);
        }
  
        newPosition() {
            if (frames % 70 === 0) {
                this.x -= this.speedX;
                
            }

            if (barbarian.x <= 0) {
                barbarian.speedX -=2;
            } else {
                barbarian.speedX += 2;
            }
            if (barbarian.x >= 400) {
                barbarian.speedX += 2;
            } else {
              barbarian.speedX -= 2;
            }
         }
  
    }

    //ENEMY ANIMATION

    function moveBarbarian() {
        
        barbarian.newPosition();
        barbarian.update(ctx);
    }

   
  
    //CHANGE BACKGROUND

    

    function backgroundChange() {
        
        if (frames <= 6000) {
            
            
            // return backgroundImg.src = "./img/background1.png";
            return backgroundImg.src = "./img/newbackground1.png";
            
        } else if (frames > 6000 && frames < 18000) {
           
            
            // backgroundImg.src = "./img/background2.jpg";
            backgroundImg.src = "./img/newbackground2.png";

        } else if (frames >= 18000 && frames < 30000) {
           
            
            // backgroundImg.src = "./img/background3.jpg";
            backgroundImg.src = "./img/newbackground3.png";

        } else if (frames >= 30000 &&  frames < 38000) {
            
            // backgroundImg.src = "./img/background4.jpg";
            backgroundImg.src = "./img/newbackground4.png";

        // } else if (frames >= 35000 && frames < 40000) {
        //     console.log(frames)
            
        //     // backgroundImg.src = "./img/background5.png";
        //     backgroundImg.src = "./img/newbackground5.png";

        // } else if (frames >= 40000 && frames < 45000) {
            
            
        //     backgroundImg.src = "./img/newbackground6.png";

        } else if (frames >= 38000) {
          
            frames = 0;
    
        
        }
        barbarianImg.src = './img/enemy.png';
        
    }

        //SCORE 
    
    function score() {
    numbers = Math.floor(frames / 1000);
    ctx.font = '29px Oxanium';
    ctx.fillStyle = 'black';
    ctx.fillText('SCORE  ' + numbers, 380, 50);
    };
  
    //teste

   

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

    let player = new Player(30, 335,10);
    
    
    let barbarian = new Barbarian(600, 270);


   

    //PLAYER CONTROLER

    
    let buttonMoveRight = document.getElementById('buttonMoveRight');
    let buttonMoveLeft = document.getElementById('buttonMoveLeft');
  

  
    document.onkeydown = function(e) {
      switch (e.keyCode) {
          case 65: // left 
              if (player.x <= 0) {
                  player.speedX +=2;
              } else {
                  player.speedX -= 2;
              }
          break;
          case 68: // right d
              if (player.x >= 600) {
                  player.speedX -= 2;
              } else {
                player.speedX += 2;
              }
              break;
        //  case 83: // down s 
        
        // if (player.y <= 30) {
        //     player.speedY -= 2;
        // } else {
        //     player.speedY += 1;
        // }
        //      break;
        // case 87: // up w
             
        // if (player.y >=500){
        //     player.speedY += 2;
        // } else {
        //     player.speedY -= 1;
        // }
        //   break;
          case 32: startGame();
        
      }
    };

    buttonMoveLeft.onclick = (event) => {
        if (player.x <= 0) {
            player.speedX +=2;
        } else {
            player.speedX -= 1;
        }

        event.target.disabled = true;
        event.target.disabled = false;
        setTimeout( player.speedX *= 0.5, 500);
      
      };
    
    buttonMoveRight.onclick = (event) => {
        if (player.x >= 600) {
            player.speedX -= 2;
        } else {
          player.speedX += 1;
        }
       
        event.target.disabled = true;
        event.target.disabled = false;
        setTimeout( player.speedX *= 0.5, 500);
    
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


        //CHECK WHICH ROCKS HAS CRASHED THE PLAYER TO COUNT THE DAMAGE
    
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
        
    
        // COUNT THE ROCKS THAT CRASHED THE PLAYER TO CHECK DAMAGE AND SUB THE VALUE FROM HEALTH
    
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
            
              myCoins[i].width = 0;
              myCoins[i].height = 0;
            //   console.log(myCoins);
          }
        }
    };
    

    // COUNT THE COINS THAT THE PLAYER HAD GOTTEN TO CHECK BONUS AND ADD THE VALUE TO HIS HEALTH STATUS

    function checkGetCoin() {
        
        myCoins.forEach((coin,i) => {
            if (coin.width === 0 && coin.height=== 0) {
                myCoins.splice(i,1)
                player.receiveBonus();
                // console.log('iiiii');
            }
        })

    }

    

    // EVERYTHING HAPPENS HERE!

    function updateGameFrame(){
        player.newPosition();
        draw();
        score();
        updateObstacles();
        updateCoins();
        checkGetCoin();
        backgroundChange();
        enemyChange();
        audio.play();
        player.statusHealth();
        moveBarbarian();
        window.requestAnimationFrame(updateGameFrame);
        checkQuest();
        checkDamage();
        checkQuest2();
        checkGameOver();
        
        
        
        
    };
    

    //START GAME

    function startGame() {
      
        window.requestAnimationFrame(updateGameFrame);
       
    };

    //GAME OVER 

    function checkGameOver() {

        if (player.health <= 0) {
            drawGameOver();
            setTimeout(() => cancelAnimationFrame(updateGameFrame), 200);
            // window.cancelAnimationFrame(updateGameFrame);
            
          }

    };

    function drawGameOver() {
        audio.pause();
        audioCoins.pause();
        audioStone.pause();
        // audioGameOver.play();
        // audioGameOver.pause();
        audioEND.play();
        // let gOverImg = new Image();
        // gOverImg.src = './img/gameover.png';
        let gameOvImg = new Image();
        gameOvImg.src = './img/gameoverOK.jpg';
        let captanImg = new Image();
        captanImg.src= './img/captain.png';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(gameOvImg, -250,-40);
        ctx.drawImage(captanImg, 150, 18);
        ctx.font = '34px Oxanium';
        ctx.fillStyle = 'white';
        ctx.fillText('YOU DIED !!!', 290, 400);
        
        
        
    };



     //RESTART

    // document.getElementById('reset-button').onclick = (event) => {      

    //     restart();
       
    // };   


    // function restart() { 
    
    //     if (drawGameOver) {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         setTimeout(() => cancelAnimationFrame(updateGameFrame), 200);
    //         frames = 0;
    //         myObstacles = [];
    //         myCoins = [];
    //         player.x = 30;
    //         player.y = 335;
    //         player.health= 10;
    //         barbarian.x = 600;
    //         barbarian.y = 270;
            
            

            
    //     }
    //     startGame();
    // }

};


