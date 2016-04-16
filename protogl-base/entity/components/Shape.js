var Shape = function(shapeName, dimensions, center) {
    this.shapeName = shapeName;
    this.glShape;
    switch (shapeName) {
        case "grid":
            this.glShape = gl.LINES;
            break;
        default:
            this.glShape = gl.TRIANGLES;
    }
    this.dimensions = dimensions;
    this.center = center;
};
Shape.prototype.name = "shape";