var Shape = function(shapeName, dimensions, center) {
    this.shapeName = shapeName;
    this.glShape;
    switch (shapeName) {
        default:
            this.glShape = gl.TRIANGLES //TODO: SPECIFY NEW SHAPE NAMES WHERE NECESSARY
    }
    this.dimensions = dimensions;
    this.center = center;
};
Shape.prototype.name = "shape";