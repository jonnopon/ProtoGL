var _getGeometry = function(name, pos, dimensions, texture, sprite, cellSize) {
    var dim = dimensions;
    var hDim = dim.clone();
    hDim.scalarDivide(2)
    var cx = pos.x;
    var cy = pos.y;

    var vertList = [];
    var glShape = gl.TRIANGLES;
    var texList = [];
    if (texture && sprite) {
        var bl = sprite.bottomLeft;
        var tr = sprite.topRight;
        var tl = sprite.topLeft;
        var br = sprite.bottomRight;
    }

    if (name === "square") {
        vertList = [
                new Vec2(cx - hDim.x, cy - hDim.y),
                new Vec2(cx + hDim.x, cy - hDim.y),
                new Vec2(cx + hDim.x, cy + hDim.y),

                new Vec2(cx + hDim.x, cy + hDim.y),
                new Vec2(cx - hDim.x, cy + hDim.y),
                new Vec2(cx - hDim.x, cy - hDim.y)
            ];
        glShape = gl.TRIANGLES;
        if (texture && sprite) {
            texList = [
                new Vec2(tl.x, tl.y),
                new Vec2(br.x, tl.y),
                new Vec2(br.x, br.y),

                new Vec2(br.x, br.y),
                new Vec2(tl.x, br.y),
                new Vec2(tl.x, tl.y)
            ]
        }
    }
    else if (name === "triangle") {
        vertList = [
            new Vec2(cx - hDim.x, cy + hDim.y),
            new Vec2(cx, cy - hDim.y),
            new Vec2(cx + hDim.y, cy + hDim.y)
        ];
        glShape = gl.TRIANGLES;
        if (texture && sprite) {
            texList = [
                //TODO: doesn't look very good
                new Vec2(bl.x, bl.y),
                new Vec2(bl.x + (br.x - bl.x), tr.y),
                new Vec2(br.x, br.y)
            ];
        }
    }
    else if (name === "grid") {
        //width, height, cellsLeft, cellsRight (or cellSizeHor, cellSizeHor)
        //var cx = pos.x;
        // var cy = pos.y;
        var cellsHor = dimensions.x / cellSize;
        var cellsVer = dimensions.y / cellSize;
        glShape = gl.LINES;
        for (var i = 0; i < dim.x; i += dimensions.x / cellsHor) {
            var lineVerts = [
                new Vec2(i, GAME.height),
                new Vec2(i, 0)
            ];
            vertList = vertList.concat(lineVerts);
        }
        for (i = 0; i < dim.y; i += dimensions.y / cellsVer) {
            var lineVerts = [
                new Vec2(0, i),
                new Vec2(GAME.width, i)
            ];
            vertList = vertList.concat(lineVerts);
        }
        
        //TODO: KEEP THIS FOR POTENTIAL COOL BOMB RIPPLE EFFECT?
        // var cellsHor = dimensions.x / cellSize;
        // glShape = gl.LINES;
        // for (var i = 0; i < dim.x; i += dimensions.x / cellsHor) {
        //     var lineVerts = [
        //         new Vec2(i, GAME.height),
        //         new Vec2(i, 0)
        //     ];
        //     vertList.push(lineVerts);
        // }
    }

    return {
        vertList: vertList,
        glShape: glShape,
        texList: texList,
    };
};
