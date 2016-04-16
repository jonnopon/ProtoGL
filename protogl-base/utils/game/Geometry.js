var _getGeometry = function(name, pos, dimensions, texture, sprite) {
    var hDim = dimensions.clone();
    hDim.scalarDivide(2)

    // var center = new Vec2(pos.x + hDim.x, pos.y + hDim.y);
    var cx = pos.x;
    var cy = pos.y;

    if (name === "square") {
        var vertList = [
                new Vec2(cx - hDim.x, cy - hDim.y),
                new Vec2(cx + hDim.x, cy - hDim.y),
                new Vec2(cx + hDim.x, cy + hDim.y),

                new Vec2(cx + hDim.x, cy + hDim.y),
                new Vec2(cx - hDim.x, cy + hDim.y),
                new Vec2(cx - hDim.x, cy - hDim.y)
            ];
        var glShape = gl.TRIANGLES;
        if (texture && sprite) {
            var bl = sprite.bottomLeft;
            var tr = sprite.topRight;
            var tl = sprite.topLeft;
            var br = sprite.bottomRight;

            var texList = [
                new Vec2(tl.x, tl.y),
                new Vec2(br.x, tl.y),
                new Vec2(br.x, br.y),

                new Vec2(br.x, br.y),
                new Vec2(tl.x, br.y),
                new Vec2(tl.x, tl.y)
            ]
        }

        return {
            vertList: vertList,
            glShape: glShape,
            texList: texList,
        };
    }
    else if (name === "triangle") {
        var vertList = [
            new Vec2(cx - hDim.x, cy + hDim.y),
            new Vec2(cx, cy - hDim.y),
            new Vec2(cx + hDim.y, cy + hDim.y)
        ];
        var glShape = gl.TRIANGLES;
        if (texture && sprite) {
            var bl = sprite.bottomLeft;
            var tr = sprite.topRight;
            var tl = sprite.topLeft;
            var br = sprite.bottomRight;

            var texList = [
                //TODO: doesn't look very good
                new Vec2(bl.x, bl.y),
                new Vec2(bl.x + (br.x - bl.x), tr.y),
                new Vec2(br.x, br.y)
            ];
        }

        return {
            vertList: vertList,
            glShape: glShape,
            texList: texList
        };
    }
};
