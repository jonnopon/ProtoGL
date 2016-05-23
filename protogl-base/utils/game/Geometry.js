//TODO: need to rethink how geometry is stored and retrieved
//EG: split up 2D and 3D?
//how to account for 3D versions of typical 2D shapes?
//EG: CUBE => RECT / 3D-TRIANGLE (NOT PRISM) => TRIANGLE
//grid doesn't make sense as a primitive geometric shape...
var _getGeometry = function(name, dimensions/*, texture, sprite, cellSize*/) {
    var dim = dimensions;
    var hDim = dim.clone();
    hDim.scalarDivide(2)

    var vertList = [];
    // var texList = [];
    // if (texture && sprite) {
    //     var bl = sprite.bottomLeft;
    //     var tr = sprite.topRight;
    //     var tl = sprite.topLeft;
    //     var br = sprite.bottomRight;
    // }

    //TODO: glShape probably belongs here, not in Entity Component "Shape"
    if (name === "f") {
        return [
            //left column
            new Vec2(0, 0),
            new Vec2(dim.x / 3, 0),
            new Vec2(dim.x / 3, dim.y),
            new Vec2(dim.x / 3, dim.y),
            new Vec2(0, dim.y),
            new Vec2(0, 0),

            //top rung
            new Vec2(dim.x / 3, 0),
            new Vec2(dim.x, 0),
            new Vec2(dim.x, dim.y / 5),
            new Vec2(dim.x, dim.y / 5),
            new Vec2(0, dim.y / 5),
            new Vec2(dim.x / 3, 0),

            //middle rung
            new Vec2(dim.x / 3, dim.y * 0.45),
            new Vec2(dim.x * 0.9, dim.y * 0.45),
            new Vec2(dim.x * 0.9, dim.y * 0.65),
            new Vec2(dim.x * 0.9, dim.y * 0.65),
            new Vec2(dim.x / 3, dim.y * 0.65),
            new Vec2(dim.x / 3, dim.y * 0.45)
        ];
    }
    if (name === "rect") {
        return  /*vertList = */[
                new Vec2(0, 0),
                new Vec2(dim.x, 0),
                new Vec2(dim.x, dim.y),
                new Vec2(dim.x, dim.y),
                new Vec2(0, dim.y),
                new Vec2(0, 0)
            ];
        // if (texture && sprite) {
        //     texList = [
        //         new Vec2(tl.x, tl.y),
        //         new Vec2(br.x, tl.y),
        //         new Vec2(br.x, br.y),
        //
        //         new Vec2(br.x, br.y),
        //         new Vec2(tl.x, br.y),
        //         new Vec2(tl.x, tl.y)
        //     ]
        // }
    }
    else if (name === "triangle") {
        return /*vertList =*/ [
            new Vec2(hDim.x, 0),
            new Vec2(dim.x, dim.y),
            new Vec2(0, dim.y)
        ];
        // if (texture && sprite) {
        //     texList = [
        //         //TODO: doesn't look very good
        //         new Vec2(bl.x, bl.y),
        //         new Vec2(bl.x + (br.x - bl.x), tr.y),
        //         new Vec2(br.x, br.y)
        //     ];
        // }
    }
    else if (name === "pentagon") {
        return /*vertList = */[
            //TODO: remap to topleft: 0,0

            new Vec2(cx, cy + hDim.y), //top
            new Vec2(cx + hDim.x, cy), //right mid
            new Vec2(cx, cy), //center

            new Vec2(cx, cy), //center
            new Vec2(cx + hDim.x, cy), //right mid
            new Vec2(cx + (hDim.x / 2), cy - hDim.y), //right bottom

            new Vec2(cx, cy), //center
            new Vec2(cx + (hDim.x / 2), cy - hDim.y), //right bottom
            new Vec2(cx - (hDim.x / 2), cy - hDim.y), //left bottom

            new Vec2(cx, cy), //center
            new Vec2(cx - (hDim.x / 2), cy - hDim.y), //left bottom
            new Vec2(cx - hDim.x, cy), //left mid

            new Vec2(cx, cy), //center
            new Vec2(cx - hDim.x, cy), //left mid
            new Vec2(cx, cy + hDim.y), //top
        ];
    }
    else if (name === "grid") {
        //TODO: remap to topleft: 0,0
        //TODO: straight up rewrite this is awful

        //width, height, cellsLeft, cellsRight (or cellSizeHor, cellSizeHor)
        //var cx = pos.x;
        // var cy = pos.y;
        var cellsHor = dimensions.x / cellSize;
        var cellsVer = dimensions.y / cellSize;
        // glShape = gl.LINES;
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

        return vertList;
    }
    else if (name === "circle") {
        //TODO: REWRITE?

        vertList = [];

        var radius = ((dimensions.x + dimensions.y) / 2) / 2;
        var twoPi = 2 * Math.PI;

        vertList.push(pos);
        for (var i = 0; i < 21; i++) {
            //TODO: only draws with 21 triangles regardless at this stage
            //should calculate required triangles
            vertList.push(new Vec2(cx + (radius * Math.cos(i * twoPi / 20)),
                cy + (radius * Math.sin(i * twoPi / 20))));
        }

        return vertList;

        // glShape = gl.TRIANGLES;
        // if (texture && sprite) {
        //     texList = [
        //         //hmmm
        //     ];
        // }
    }
    else if (name === "cube") {
        vertList = [];

        return [
            //face 1 (front)
            new Vec3(0, 0, 0),
            new Vec3(dim.x, 0, 0),
            new Vec3(dim.x, dim.y, 0),
            new Vec3(dim.x, dim.y, 0),
            new Vec3(0, dim.y, 0),
            new Vec3(0, 0, 0),

            //face 2 (back)
            new Vec3(0, 0, dim.z),
            new Vec3(dim.x, 0, dim.z),
            new Vec3(dim.x, dim.y, dim.z),
            new Vec3(dim.z, dim.y, dim.z),
            new Vec3(0, dim.y, dim.z),
            new Vec3(0, 0, dim.z),

            //face 3 (top)
            new Vec3(0, 0, 0),
            new Vec3(dim.x, 0, 0),
            new Vec3(dim.x, 0, dim.z),
            new Vec3(dim.x, 0, dim.z),
            new Vec3(0, 0, dim.z),
            new Vec3(0, 0, 0),

            //face 4 (bottom)
            new Vec3(0, dim.y, 0),
            new Vec3(dim.x, dim.y, 0),
            new Vec3(dim.x, dim.y, dim.z),
            new Vec3(dim.x, dim.y, dim.z),
            new Vec3(0, dim.y, dim.z),
            new Vec3(0, dim.y, 0),

            //face 5 (left)
            new Vec3(0, 0, 0),
            new Vec3(0, dim.y, 0),
            new Vec3(0, dim.y, dim.z),
            new Vec3(0, dim.y, dim.z),
            new Vec3(0, 0, dim.z),
            new Vec3(0, 0, 0),

            //face 6 (right
            new Vec3(dim.x, 0, 0),
            new Vec3(dim.x, dim.y, 0),
            new Vec3(dim.x, dim.y, dim.z),
            new Vec3(dim.x, dim.y, dim.z),
            new Vec3(dim.x, 0, dim.z),
            new Vec3(dim.z, 0, 0)
        ];
    }
};
