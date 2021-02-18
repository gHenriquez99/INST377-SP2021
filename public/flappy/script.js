/* eslint-disable no-use-before-define */
document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.gameContainer');
  const ground = document.querySelector('.ground');

  const birdLeft = 220;
  let birdBottom = 100;
  const gravity = 2;
  let isGameOver = false;

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = `${birdBottom}px`;
    bird.style.left = `${birdLeft}px`;
  }
  const gametimerId = setInterval(startGame, 20);

  function jump() {
    if (birdBottom < 500) {
      birdBottom += 50;
    }
    bird.style.bottom = `${birdBottom}px`;
    console.log(birdBottom);
  }

  function control(e) {
    if (e.keyCode === 32 || e.keyCode === 38) {
      jump();
    }
  }

  document.addEventListener('keyup', control);

  function generateObstacle() {
    let obstacleLeft = 500;
    const randomHeight = Math.random() * 60;
    const obstacleBottom = randomHeight;
    const gap = 430;

    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div');
    if (!isGameOver) {
      obstacle.classList.add('obstacle');
      topObstacle.classList.add('topObstacle');
    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.bottom = `${obstacleBottom}px`;
    topObstacle.style.bottom = `${obstacleBottom + gap}px`;
    obstacle.style.left = `${obstacleLeft}px`;
    topObstacle.style.left = `${obstacleLeft}px`;

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = `${obstacleLeft}px`;
      topObstacle.style.left = `${obstacleLeft}px`;

      if (obstacleLeft === -60) {
        // eslint-disable-next-line no-use-before-define
        clearInterval(timerId2);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      if (
        obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220
        // eslint-disable-next-line no-mixed-operators
        && (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200)
        // eslint-disable-next-line no-mixed-operators
        || birdBottom === 0
      ) {
        gameOver();
        clearInterval(timerId2);
      }
    }
    const timerId2 = setInterval(moveObstacle, 20);
    if (!isGameOver) {
      setTimeout(generateObstacle, 3000);
    }
  }

  generateObstacle();

  function gameOver() {
    clearInterval(gametimerId);
    console.log('the game is over, you lost!');
    isGameOver = true;
    document.removeEventListener('keyup', control);
  }
});