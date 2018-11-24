//"wrapping" an Entity so as to leverage engine functionality regarding world positioning
//by adding components to the camera, it'd be possible to have physics and collision etc
//The Renderer is setup to take the embedded Entity's transform matrix as the viewMatrix
//THIS LEADS TO A REQUIREMENT: that the getViewMatrix() is only called AFTER the EntityManager update
//this is to ensure that the Entity's transform matrix has been computed
var Camera3D = function(position/*,*/ /*target*/) {
    this.position = position;
    // this.target = target;

    this.viewMatrix = new Mat4();

    //TODO: STOP USING AN ENTITY, IT DOESN'T HELP AS MUCH AS YOU THINK IT DOES
    //INSTEAD, A CAMERA SHOLD JUST BE REPRESENTED BY A POSITION, A TARGET, AND AN UP
    //VELOCITY ETC CAN BE BUILT AROUND AFFECTING THE POSITION?
    //OR MAYBE AN ENTITY IS THE BEST CHOICE?

    this.up = new Vec3(0, 1, 0);
    // var zAxis = null; /* position - target */

    //0000
    //0000
    //zzz0
    //0000

    // this.xAxis = null; /* cross product of zAxis and up */
    // this.yAxis = null; /* cross product of zAxis and xAxis */

    this.e = new Entity("camera");
    this.e.addComponent(new Transform3D(position, new Vec3(), new Vec3()));

    this.e.components.transform3D.moveType = 0;


    // GAME.renderer.addCamera(new Camera3D(new Vec3(), GAME.entityManager.ents[0].components.transform3D.position));

    //no flatcolor, sprite, shape, or shader - it will be ignored by the entity manager
};
Camera3D.prototype.update = function() {

    //do stuff

    // this.e.components.transform3D.angle += degToRad(1);

    // this.e.components.transform3D.position.z += 1;

    // this.e.components.transform3D.velocity.rotate()

    // GAME.entityManager.computeMatrix3D(this.e);

    this.position = this.e.components.transform3D.position.clone();

    // GAME.renderer.pointLightPosition = this.position.clone();
    // GAME.renderer.pointLightPosition.z = -1000;

    //
    //
};
Camera3D.prototype.setTarget = function(targetVector) {
    this.target = targetVector;
};
Camera3D.prototype.move = function(velocity) {

};
Camera3D.prototype.rotateX = function(origin, angle) {
    this.target.rotateX(origin, angle);
    this.up.rotateX(origin, angle);
};
Camera3D.prototype.rotateY = function(origin, angle) {
    this.target.rotateY(origin, angle);
    this.up.rotateY(origin, angle);
};
Camera3D.prototype.rotateZ = function(origin, angle) {
    this.target.rotateZ(origin, angle);
    this.up.rotateZ(origin, angle);
};
// Camera3D.prototype.setVelocity = function(velocity) {
//
// };
Camera3D.prototype.setScale = function(scale) {
    
};
Camera3D.prototype.getViewMatrix = function() {
    // var mat = new Mat4();
    // mat.setAsLookAt(this.e.components.transform3D.position, this.target, this.up);
    //
    // return mat;
    return this.e.components.transform3D.transform;


};