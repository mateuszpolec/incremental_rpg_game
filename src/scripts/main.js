//Game section

var game = {
  isFight: false,
  round: 0,
  winner: null,
  refill: function() {
    console.log("Refillowanie w trakcie...");
    player.hp[0] = player.hp[1];
    enemy.hp[0] = enemy.hp[1];
    if (this.winner == "Player") {
      player.nextGeneration();
      enemy.nextGeneration();
    }
  }
};

//Main character section

var player = {
  level: 1,
  coins: 0,
  strenght: 0,
  agility: 0,
  inteligence: 0,
  defence: 0,
  luck: 3,
  hp: [100, 100],
  getDamage: function() {
    return (
      Math.floor(
        this.level * 2 +
          this.strenght * 0.4 +
          this.inteligence * 0.4 +
          this.agility * 0.35
      ) * this.luck
    );
  },
  checkHp: function() {
    if (this.hp[0] <= 0) {
      game.refill();
      game.winner = "Enemy";
      game.isFight = false;
      console.log("Player die. Winner is: " + game.winner);
    } else {
      enemy.hp[0] -= this.getDamage();
      console.log("Player uses basic attack: " + this.getDamage());
      console.log("Enemy hp: " + enemy.hp[0]);
    }
  }
};

//Enemy section

var enemy = {
  level: 2,
  drop_coins: 150,
  strenght: 3,
  agility: 5,
  inteligence: 3,
  defence: 9,
  luck: 3,
  hp: [25, 25],
  getDamage: function() {
    return (
      Math.floor(
        this.level * 1.5 +
          this.strenght * 0.2 +
          this.inteligence * 0.2 +
          this.agility * 0.15
      ) *
      (0.5 * this.luck)
    );
  },
  checkHp: function() {
    if (this.hp[0] <= 0) {
      game.refill();
      game.winner = "Player";
      game.isFight = false;
      console.log("Enemy die. Winner is: " + game.winner);
    } else {
      player.hp[0] -= this.getDamage();
      console.log("Enemy uses basic attack: " + this.getDamage());
      console.log("Player hp: " + player.hp[0]);
    }
  }
};

//Shop section
var shop = {
  item1: {
    name: "Long Sword",
    cost: 100
  },
  item2: {
    name: "Bow",
    cost: 100
  },
  item3: {
    name: "Magic Wand",
    cost: 100
  }
};

let newItems = {
  item1: {
    name: "Wooden Sword",
    cost: 5009
  }
};

//Fight section

$("#startfight").click(function() {
  console.log("Start fight!");
  console.log("================");
  fight(game.round);
});

let fight = (round, isFight) => {
  game.isFight = true;
};

$("#basicattack").click(function() {
  if (game.isFight == true) {
    player.checkHp();
    enemy.checkHp();
  } else {
    console.log("Start fight first!");
  }
});

//Sekcja testowa
shop = Object.assign({}, shop, newItems);
