window.onload = () => {

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
  
    // let backgroundRoad = new Image();
    // backgroundRoad.src = "./img/";
  
    // let player = new Image();
    // player.src = "./img/";
    
  
    document.getElementById('start-button').onclick = () => {
        startGame();
    };

    function startGame() {

        draw();
    }
    





    let draw = () => {

        ctx.clearRect(0, 0, 900, 700);



    }

}