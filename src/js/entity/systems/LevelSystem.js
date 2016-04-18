var LevelSystem = function() {
    this.player = null;
    var currentEnemies = GAME.filterEntitiesByTag("enemy");

    GAME.maxEnemies = GAME.maxEnemies || 10;

    if (currentEnemies.length === 0) {
        GAME.wave++;
        GAME.maxEnemies = Math.ceil(GAME.maxEnemies * 1.0000005);
        if (GAME.maxEnemies > 100) {
            GAME.maxEnemies = 100;
        }

        for (var i = 0; i < GAME.maxEnemies; i++) {
            var squareChance = 0.95, triangleChance = 0.05, pentagonChance = 0;

            triangleChance += 0.05;
            if (triangleChance > 0.35) {
                triangleChance = 0.35;
            }
            pentagonChance += 0.005;
            if (pentagonChance > 0.2) {
                pentagonChance = 0.2;
            }

            var fives = GAME.wave % 5;
            var tens = GAME.wave % 10;

            if (tens === 0) {
                //this round is a multiple of ten - give maxhealth and override next round as hand-crafted
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
                //this round is a multiple of five - give health and adjust weights
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
            if (r < pentagonChance) {
                shape = "pentagon";
            }
            else if (r < triangleChance) {
                shape = "triangle";
            }

            if (shape == "square") {
                zz = 1000
            }

            GAME.addEntity(Enemy(shape));
        }
        //delayed and telegraphed spawning for procedural waves (randomised per entity)
    }
};