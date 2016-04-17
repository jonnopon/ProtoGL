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

            squareChance -= 0.195;
            if (squareChance < 0.45) {
                squareChance = 0.45;
            }
            triangleChance += 0.195;
            if (triangleChance > 0.4) {
                triangleChance = 0.4;
            }
            pentagonChance += 0.01;
            if (pentagonChance > 0.2) {
                pentagonChance = 0.2;
            }

            var fives = GAME.wave % 5;
            var tens = GAME.wave % 10;

            if (tens === 0) {
                //this round is a multiple of ten - give maxhealth and override next round as hand-crafted
                if (this.player === null) {
                    this.player = GAME.filterEntitiesByTag("player")[0];

                    this.player.components.health.maxValue++;
                    this.player.components.health.value = this.player.components.health.maxValue
                }
            }
            else if (fives === 0) {
                //this round is a multiple of five - give health and adjust weights
                if (this.player === null) {
                    this.player = GAME.filterEntitiesByTag("player")[0];

                    this.player.components.health.value++;
                }
            }
            else {
                this.player = null;
            }

            var r = Math.random();

            var shape = "";
            if (r < pentagonChance) {
                shape = "pentagon";
            }
            else if (r < triangleChance) {
                shape = "triangle";
            }
            else if (r < squareChance) {
                shape = "square"
            }

            GAME.addEntity(Enemy(shape));
        }
        //special milestone rounds
        //hand crafted, not random
        //extra max life every 10 rounds
        //delayed and telegraphed spawning for procedural waves (randomised per entity)
    }
};