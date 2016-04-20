var LevelSystem = function() {
    this.player = null;
    var currentEnemies = GAME.filterEntitiesByTag("enemy");

    if (currentEnemies.length === 0) {
        GAME.wave++;
        
        GAME.maxEnemies = Math.ceil(GAME.maxEnemies * 1.0000005);
        if (GAME.maxEnemies > 100) {
            GAME.maxEnemies = 100;
        }

        for (var i = 0; i < GAME.maxEnemies; i++) {
            GAME.triangleChance += 0.05;
            if (GAME.triangleChance > 0.35) {
                GAME.triangleChance = 0.35;
            }
            GAME.pentagonChance += 0.005;
            if (GAME.pentagonChance > 0.2) {
                GAME.pentagonChance = 0.2;
            }

            var fives = GAME.wave % 5;
            var tens = GAME.wave % 10;

            if (tens === 0) {
                //this round is a multiple of ten
                if (this.player === null) {
                    this.player = GAME.filterEntitiesByTag("player")[0];
                    if (this.player) {
                        this.player.components.health.maxValue++;
                        this.player.components.health.value = this.player.components.health.maxValue

                        GAME.soundManager.playSound("bonus");
                    }
                }
            }
            else if (fives === 0) {
                //this round is a multiple of five
                if (this.player === null) {
                    this.player = GAME.filterEntitiesByTag("player")[0];
                    if (this.player) {
                        this.player.components.health.value++;

                        GAME.soundManager.playSound("bonus");
                    }
                }
            }
            else {
                this.player = null;
            }

            var r = Math.random();

            var shape = "square";
            if (r < GAME.pentagonChance) {
                shape = "pentagon";
            }
            else if (r < GAME.triangleChance) {
                shape = "triangle";
            }

            GAME.addEntity(Enemy(shape));
        }
    }
};