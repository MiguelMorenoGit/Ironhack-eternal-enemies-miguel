
'use strict';

class Game{
  constructor(canvas){
    this.canvas = canvas ;
    this.ctx = this.canvas.getContext('2d');
    this.player;
    this.enemies = [];
    this.isGameOver = false;
    

  };

  startLoop() {
    
    this.player = new Player(this.canvas,3);

    const loop = ()=>{

      if(Math.random() > 0.97) { // solo generaran enemigos cuando el numeor se mayor a 0.97 el mathrandom va de 0 a 1
        const y = Math.random()* this.canvas.height;
        this.enemies.push(new Enemy(this.canvas, y))
      }

      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();
      

      if(!this.isGameOver){
        window.requestAnimationFrame(loop);
      };
    };
    window.requestAnimationFrame(loop);
  };

  updateCanvas(){
    this.player.update();
    this.enemies.forEach((enemy)=>{
      enemy.update();
    })
  };

  clearCanvas(){
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

  };

  drawCanvas(){
    this.player.draw();
    this.enemies.forEach((enemy)=>{
      enemy.draw();
    })

  };

  checkAllCollisions(){
    this.player.checkColissionPlayerScreen(); 
    this.enemies.forEach((enemy,index) =>{
      if(this.player.checkCollissionEnemy(enemy)){
        this.player.loseLive();
        this.enemies.splice(index,1);
        if(this.player.lives === 0){
          this.isGameOver = true;
          this.onGameOver();

        }
        console.log('dead');
      };
    });

  }

  gameOverCallback(callback){
    this.onGameOver = callback;

  }



}



debugger;