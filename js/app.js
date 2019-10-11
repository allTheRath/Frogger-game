class Enemy {
  static positions = [60 ,150 ,230];
  static counter = 0;
  constructor(x = 0, y = Enemy.positions[Enemy.counter], speed = 1.2) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.counter = Enemy.counter++;
  }
  ran() {
    return Math.floor(Math.random() * 4 + 1);
  }
  update(dt) {
    this.x += this.speed;
    
    allEnemies.forEach(element => {
    if(element.x > 555) {
        element.x = -60;
        element.speed = this.ran();
    }
    });
    
    (function colisionDetection() {
      let playerX = player.a;
      let playerY = player.b;
      let colision = false;
      let playing = false;
      allEnemies.forEach(element => {
        if(Math.abs(element.x - playerX) < 15) {
          if(Math.abs((element.x + element.y) - (player.a + player.b)) <= 61) {
            player.a = 200;
            player.b = 400;
            player.render();
            player.life--;
            if(player.life == 0) {
              document.querySelector('#life').textContent = `${player.life + 3}`;    
            }
            else {
              document.querySelector('#life').textContent = `${player.life}`;
            }
            colision = true;
          }
        }
        if(Math.abs(element.y - playerY) < 15) {
          if(Math.abs((element.x + element.y) - (player.a + player.b)) <= 61) {
            player.a = 200;
            player.b = 400;
            player.render();
            player.life--;
            if(player.life == 0) {
              document.querySelector('#life').textContent = `${player.life + 3}`;    
            }
            else {
              document.querySelector('#life').textContent = `${player.life}`; 
            }
            colision = true;
          }
                
        }
        if(player.life == 0) {
          player.life = 3;
          player.level = 1;
          element.reset(element);
        }
        
        if(colision == true) {
          playing = true;
          document.querySelector('#crash').play();
        }  

        if(playing == true) {
          document.querySelector('#crash').load();
          document.querySelector('#crash').play();
          playing == false;
        }
          
      });
    })();
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  
  reset(enemyInstance, level = 1, speed = 0.6) {
    if(level !== 1) { 
      document.querySelector('#levelUp').play();
      enemyInstance.x = 0;
      enemyInstance.y = Enemy.positions[this.counter];
      enemyInstance.speed = enemyInstance.ran() * level;
      Enemy.counter++;
    } else {
      document.querySelector('#level').textContent = `1`;
      player.a = 200;
      player.b = 400;
      player.render();
      enemyInstance.x = 0;
      enemyInstance.y = Enemy.positions[this.counter];
      enemyInstance.speed = speed * level;
    }
  }
}

class Player {
  constructor(a, b) {
    this.sprite = 'images/char-boy.png';
    this.a = a;
    this.b = b;
    this.life = 3;
    this.level = 1;
    this.highestLevel = 1;
  }
  update(a = 0, b = 0) {
    this.a += a;
    this.b += b;

  }
  
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
  }

  handleInput(string) {
    // console.log(string);
    
    switch(true) {
      case (string === 'left'):    
        this.update(-101, undefined);
        this.render();
      break;
      case (string === 'right'):
        this.update(101, undefined); 
        this.render();   
      break;
      case (string === 'up'):
        this.update(undefined, -85);
        this.render();
      break;
      case (string === 'down'):
        this.update(undefined, 85);
        this.render();
      break;    
    }

    if(this.b < 60) {
      this.level++;
      if(this.level > this.highestLevel) {
        this.highestLevel++;
      }
      document.querySelector('#level').textContent = `${this.level}`;
      document.querySelector('#highestLevel').textContent = `${this.highestLevel}`;
      console.log(this.level, `level`);
      this.a = 200;
      this.b = 400;
      this.render();
      if(this.level % 3 == 0) {
        allEnemies.push(new Enemy());
      }
      allEnemies.forEach(element => {
        element.reset(element, this.level);
      });
    }

    if(this.a > 485 || this.b > 400 || this.a < -50 || this.b < -55) {
        // console.log(this.a, this.b);
      this.a = 200;
      this.b = 400;
      this.render();
    }

  }
}

let enemy1 = new Enemy(0, 60, 2);
let enemy2 = new Enemy(0, 150, 3);
let enemy3 = new Enemy(0, 230, 1);
allEnemies  = [ enemy1, enemy2, enemy3];
player = new Player(200, 400);

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);

});

