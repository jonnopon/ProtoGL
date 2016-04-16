// //The init function is called on page load, and is where you'll configure the game and start it
// var init = function() {
//     //Construct the Game object, setting its width and height in pixels
//     var game = new Game(800, 600);
//     game.setBackgroundColor(new Vec3(0, 0, 0));
//
//     //STEP 1: attach init data to the game object (loaded upon game initialisation)
//     game.initData = {
//         "lastGen": 0
//     };
//     //STEP 2: attach initialisation function to the game (called during game.start())
//     game.initFunc = function() {
//         this.initManagers();
//         this.displayStats = true;
//
//         this.soundManager.addSound("point", "res/snd/collect.wav");
//         this.soundManager.addSound("hit", "res/snd/hit.wav");
//         this.switchToState("menu");
//     };
//
//     //STEP 3: attach reinit data to the game object (loaded upon game re-initialisation)
//     //it may be useful here, for more complex games, to leave some data unchanged on re-initialisation
//     //this is designed to allow flexible control of the game loop
//     game.reinitData = {
//         "lastGen": 0
//     };
//     //STEP 4: attach re-initialisation function to the game (called during game.reinit())
//     game.reinitFunc = function () {
//         this.initManagers();
//         this.displayStats = true;
//
//         this.soundManager.addSound("point", "res/snd/collect.wav");
//         this.soundManager.addSound("hit", "res/snd/hit.wav");
//         this.switchToState("game");
//     };
//
//     //STEP 5: attach utility functions to game - global game behaviors accessible anywhere
//     game.genFood = function() {
//         this.addEntity(Food());
//     };
//     game.genEnemy = function(currentPoints) {
//         if (currentPoints > this.lastGen) {
//             this.addEntity(Enemy());
//         }
//         this.lastGen = currentPoints;
//     };
//
//     //STEP 6: add the states to the game
//     //for this demonstration, I have separated states into their own files
//     //each file contains a capitalised generator function that returns a State object to attach to the game
//     //You could choose to construct these states in this file, or you could do anything you like
//     //the only requirement is that addState() receives a complete State object with a name as well as its init and tick functions
//     game.addState(MenuState());
//     game.addState(GameState());
//     game.addState(PausedState());
//     game.addState(DeadState());
//
//     //STEP 7: start the game!
//     game.start();
// };