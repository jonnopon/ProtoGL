var LevelSystem = function() {
    var currentEnemies = GAME.filterEntitiesByTag("enemy");

    GAME.maxEnemies = GAME.maxEnemies || 10;
    GAME.wave = GAME.wave || 0;

    if (currentEnemies.length === 0) {
        GAME.wave++;
        GAME.maxEnemies = Math.ceil(GAME.maxEnemies * 1.005);


        for (var i = 0; i < GAME.maxEnemies; i++) {
            GAME.addEntity(Enemy(Math.random() < 0.5 ? "square" : "triangle"));
        }
        //special milestone rounds
        //hand crafted, not random
        //health replenish after 5 rounds
        //extra max life every 10 rounds
    }
};