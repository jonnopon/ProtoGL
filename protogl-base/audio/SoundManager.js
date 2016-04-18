var SoundManager = function() {
    this.sounds = {};
};

SoundManager.prototype.playSound = function(name) {
	var sound = new Audio(this.sounds[name]);
    sound.volume = 0.05;
	sound.play();
};
SoundManager.prototype.addSound = function(name, location) {
	this.sounds[name] = location;
};