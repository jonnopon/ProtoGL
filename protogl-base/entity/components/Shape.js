var Shape = function(shapeName, dimensions, gridCellsHor, gridCellsVert) {
    this.shapeName = shapeName;
    this.dimensions = dimensions;

    var geometryData = _getGeometry(shapeName, dimensions, gridCellsHor, gridCellsVert);

    this.geometry = geometryData.vertList;
    this.normals = geometryData.normals || [];
    this.glShape = geometryData.glShape;
};
Shape.prototype.name = "shape";