var Shape = function(shapeName, dimensions, center) {
    this.shapeName = shapeName;
    this.glShape;
    switch (shapeName) {
        case "grid":
        case "line":
            this.glShape = gl.LINES;
            break;
        case "circle":
            this.glShape = gl.TRIANGLE_FAN;
            break;
        default:
            this.glShape = gl.TRIANGLES;
    }
    this.dimensions = dimensions;
    this.center = center;

    this.geometry = _getGeometry(shapeName, dimensions);
};
Shape.prototype.name = "shape";