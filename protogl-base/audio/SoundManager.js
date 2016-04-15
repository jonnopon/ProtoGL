var SoundManager = function() {
    this.sounds = {};
};

SoundManager.prototype.playSound = function(name) {
	new Audio(this.sounds[name]).play();
};
SoundManager.prototype.addSound = function(name, location) {
	this.sounds[name] = location;
};