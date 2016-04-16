var LevelSystem = function() {
    var currentEnemies = GAME.filterEntitiesByTag("enemy");

    if (currentEnemies.length === 0) {
        for (var i = 0; i < GAME.maxEnemies; i++) {
            GAME.addEntity(Enemy("square"));
        }
    }
};