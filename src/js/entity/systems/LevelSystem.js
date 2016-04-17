var LevelSystem = function() {
    this.player = null;
    var currentEnemies = GAME.filterEntitiesByTag("enemy");

    GAME.maxEnemies = GAME.maxEnemies || 10;
    GAME.wave = GAME.wave || 0;

    if (currentEnemies.length === 0) {
        GAME.wave++;
        GAME.maxEnemies = Math.ceil(GAME.maxEnemies * 1.0000005);
        if (GAME.maxEnemies > 100) {
            GAME.maxEnemies = 100;
        }

        for (var i = 0; i < GAME.maxEnemies; i++) {
            var squareChance = 0.95, triangleChance = 0.05, pentagonChance = 0;

            var fives = GAME.wave % 5;
            var tens = GAME.wave % 10;

            if (tens === 0) {
                //this round is a multiple of ten - give maxhealth and override next round as hand-crafted
                if (this.player === null) {
                    this.player = GAME.filterEntitiesByTag("player")[0];

                    this.player.components.health.maxValue++;
                    this.player.components.health.value = this.player.components.health.maxValue;
                    squareChance -= 0.15;
                    triangleChance += 0.145;
                    pentagonChance += 0.005;
                }
            }
            else if (fives === 0) {
                //this round is a multiple of five - give health and adjust weights
                if (this.player === null) {
                    this.player = GAME.filterEntitiesByTag("player")[0];

                    this.player.components.health.value++;
                    squareChance -= 0.15;
                    triangleChance += 0.145;
                    pentagonChance += 0.005;
                }
            }
            else {
                this.player = null;
            }

            var r = Math.random();
            // var chances = sort();
            // if (r < spareChance) {
            //
            // }
            var chances = [squareChance, triangleChance, pentagonChance].sort();
            // for (var i = 0; i < )
            GAME.addEntity(Enemy(r < pentagonChance ? "pentagon" : r < triangleChance ? "triangle" : "square"));
        }
        //special milestone rounds
        //hand crafted, not random
        //extra max life every 10 rounds
        //delayed and telegraphed spawning for procedural waves (randomised per entity)
    }
};