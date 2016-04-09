var SoundManager = function() {
    this.sounds = {};

    this.playSound = function(name) {
		new Audio(this.sounds[name]).play();
	};

	this.addSound = function(name, location) {
		this.sounds[name] = location;
	};
};