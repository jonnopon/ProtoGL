var KeyCodes = function() {
    //TODO: this probably shouldn't be a function; more like the mat4 class in gl-matrix maybe?
    //TODO: does this making sense as such mean that global utilities should all follow that pattern?
    
    //alphabet
    this.a = 65;
    this.b = 66;
    this.c = 67;
    this.d = 68;
    this.e = 69;
    this.f = 70;
    this.g = 71;
    this.h = 72;
    this.i = 73;
    this.j = 74;
    this.k = 75;
    this.l = 76;
    this.m = 77;
    this.n = 78;
    this.o = 79;
    this.p = 80;
    this.q = 81;
    this.r = 82;
    this.s = 83;
    this.t = 84;
    this.u = 85;
    this.v = 86;
    this.w = 87;
    this.x = 88;
    this.y = 89;
    this.z = 90;

    //Numbers
    this.num1 = 49;
    this.num2 = 50;
    this.num3 = 51;
    this.num4 = 52;
    this.num5 = 53;
    this.num6 = 54;
    this.num7 = 55;
    this.num8 = 56;
    this.num9 = 57;
    this.num0 = 48;
    
    //Numpad
    this.numPad8 = 38;
    this.numPad4 = 37;
    this.numPad6 = 39;
    this.numPad5 = 12;
    
    //Arrows
    this.leftArrow = 37;
    this.rightArrow = 39;
    this.upArrow = 38;
    this.downArrow = 40;
    
    //Browser Controls
    this.f5 = 116;
    this.f11 = 122
    this.f12 = 123;

    //Misc
    this.space = 32;
    this.enter = 13;
    this.leftShift = 16;
    this.rightShift = 16;
    this.leftCtrl = 17;
    this.rightCtrl = 17;
    this.esc = 27;
};