let knight = {  
  name: "Litzar'",
  damage: 30,
  armor: 1,
  health: 100,
  imageUlr:"./assets/img/teeeeest.png"
};

let slime = { 
  name: "SlimeUwU",
  damage: 10,
  armor: 2,
  health: 100,
  imageUlr:"./assets/img/slimes.png"
};

let yourHero;
let yourBadGuy;
let heroIndex;
let hero;
let maxHealth = knight.health;
window.onload = function () {
  function init() {
    yourBadGuy = slime;
    hero = knight;
    document.getElementById("hero").style.backgroundImage = `url(${hero.imageUlr})`;
   
    updateStats();
  }


  function endGame() {
    alert("Потрачено!");
    knight.health = maxHealth; 
    location.reload();
    updateStats();
  }

  function updateStats() {
    if (hero.health <= 0) {
      endGame();
    } else {
      document.getElementById("nameHero").innerHTML = "name - " + hero.name;
      document.getElementById("damageHero").innerHTML = "damage - " + hero.damage;
      document.getElementById("armorHero").innerHTML = "armor - " + hero.armor;
      document.getElementById("healthHero").innerHTML = "health - " + hero.health;

    }
  }

  function updateStatsEnemy(yourBadGuy) {
    document.getElementById("enemyStats").style.display = "block";
    document.getElementById("nameEnemy").innerHTML = "name - " + yourBadGuy.name;
    document.getElementById("damageEnemy").innerHTML = "damage - " + yourBadGuy.damage;
    document.getElementById("armorEnemy").innerHTML = "armor - " + yourBadGuy.armor;
    
    document.getElementById("healthEnemy").innerHTML = "health - " + yourBadGuy.health;
  }
    

  function battle() {
    badGuyToFight =0
      slime;
    let confirmBadGuy = confirm(
      "Вы встретили " +
      slime.name +
      " Вступить в сражение? Или спастись бегством?"
    );

    if (confirmBadGuy) {
      document.getElementById("enemy").style.backgroundImage = `url(${yourBadGuy.imageUlr})`;
      document.getElementById("enemy").style.display = "block";
      document.getElementById("hero-attack").style.display = "block";
      document.getElementById("go-battle").style.display = "none";
      updateStatsEnemy(yourBadGuy)
    } else {
      hero.health -= yourBadGuy.damage;
      updateStats();
    }
  }

  function checkHealth() {
    updateStatsEnemy(yourBadGuy);
    updateStats();
    if (hero.health <= 0) {
      endGame();
    } else if (yourBadGuy.health <= 0) {
      document.getElementById("enemy").style.display = "none";
      document.getElementById("hero-attack").style.display = "none";
      document.getElementById("go-battle").style.display = "block";
      document.getElementById("enemyStats").style.display = "none";
      alert(`Вы победили ${yourBadGuy.name}`);
      document.getElementById("go-battle").style.display = "block";
      yourBadGuy.health = 100;
      hero.damage += 5;
      updateStats();

      return true
    }
  }

  function heroAtack() {
    yourBadGuy.health -= hero.damage - yourBadGuy.armor;
    animateHeroAtackScript();
    if(!checkHealth()){
      setTimeout(() => {
        enemyAtack();
      }, 2500);
    }

   
  }

  function enemyAtack() {
    hero.health -= yourBadGuy.damage - hero.armor;
    animateEnemyAtackScript();
    checkHealth()
  }

  document.getElementById("hero-attack").onclick = heroAtack;
  document.getElementById("go-battle").onclick = battle;

  init();


  let intervalEnemyAtackAnim;
  let intervalHeroAtackAnim;
  let intervalHitAnim;


  function stopAnimate(item) {
    clearInterval(item);
  }


  function animateEnemyAtackScript() {
    let position = -0;
    const interval = 170;
    const diff = 415;
    intervalEnemyAtackAnim = setInterval(() => {

      document.getElementById("enemy").style.backgroundPosition =
        `-${position}px -2505px`;

      if (position < 2000) {
        position = position + diff;
      } else {
        position = -0;
        document.getElementById("enemy").style.backgroundPosition =
          `-0px -2505px`;
        stopAnimate(intervalEnemyAtackAnim)
      }

    }, interval);
  }

  function animateHeroAtackScript() {    
    let position = -0;
    const interval = 140;
    const diff = 400;
      document.getElementById("hero").style.transform = "translate(200px,0)"
    intervalHeroAtackAnim = setInterval(() => {

      document.getElementById("hero").style.backgroundPosition =
        `-${position}px -2900px`;

      if (position < 2300) {
        position = position + diff;
      } else {
        position = -0;
        document.getElementById("hero").style.backgroundPosition =
          `-0px -2900px`;
        document.getElementById("hero").style.transform = "translate(0px,0px)"
        stopAnimate(intervalHeroAtackAnim);

      }

    }, interval);
  }

};