var LevelSystem = function() {
    var currentEnemies = GAME.filterEntitiesByTag("enemy");

    GAME.maxEnemies = GAME.maxEnemies || 15;
    GAME.wave = GAME.wave || 1;

    if (currentEnemies.length === 0) {
        for (var i = 0; i < GAME.maxEnemies; i++) {
            GAME.addEntity(Enemy(Math.random() < 0.5 ? "square" : "triangle"));
        }
    }
};