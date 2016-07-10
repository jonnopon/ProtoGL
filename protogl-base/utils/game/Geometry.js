var Geometry = {};
Geometry.twoD = {};
Geometry.twoD.primitive = {};
Geometry.twoD.misc = {};
Geometry.threeD = {};
Geometry.threeD.primitive = {};
Geometry.threeD.misc = {};

Geometry.twoD.primitive.line = function(length) {
    return {
        vertList: [
            new Vec2(length / 2, 0),
            new Vec2(length / 2, length)
        ],
        glShape: gl.LINES
    }
};
Geometry.twoD.primitive.triangle = function(dimensions) {
    var hDim = dimensions.clone();
    hDim.scalarDivide(2);

    return {
        vertList: [
            new Vec2(hDim.x, 0),
            new Vec2(dimensions.x, dimensions.y),
            new Vec2(0, dimensions.y)
        ],
        glShape: gl.TRIANGLES,
        textureStuff: [

        ]
    };
};
Geometry.twoD.primitive.rect = function(dimensions) {
    return {
        vertList: [
            new Vec2(0, 0),
            new Vec2(dimensions.x, 0),
            new Vec2(dimensions.x, dimensions.y),
            new Vec2(dimensions.x, dimensions.y),
            new Vec2(0, dimensions.y),
            new Vec2(0, 0)
        ],
        glShape: gl.TRIANGLES,
        textureStuff: [

        ]
    };
};
Geometry.twoD.primitive.pentagon = function(dimensions) {
    var top = new Vec2(dimensions.x / 2, 0);
    var rightMid = new Vec2(dimensions.x * 0.9, dimensions.y * 0.45);
    var rightBottom = new Vec2(dimensions.x * 0.75, dimensions.y);
    var leftBottom = new Vec2(dimensions.x * 0.25, dimensions.y);
    var leftMid = new Vec2(dimensions.x * 0.1, dimensions.y * 0.45);
    var center = new Vec2(dimensions.x / 2, dimensions.y / 2);

    return {
        vertList: [
            top, rightMid, center,
            center, rightMid, rightBottom,
            center, rightBottom, leftBottom,
            center, leftBottom, leftMid,
            center, leftMid, top
        ],
        glShape: gl.TRIANGLES
    };
};
Geometry.twoD.primitive.circle = function(dimensions) {
    var vertList = [];
    var radius = ((dimensions.x + dimensions.y) / 2) / 2;
    var twoPi = 2 * Math.PI;
    var center = new Vec2(dimensions.x / 2, dimensions.y / 2);

    for (var i = 0; i < 31; i++) {
        var angle = twoPi * i / 30;

        vertList.push(
            new Vec2(
                center.x + (radius * Math.cos(angle)),
                center.y + (radius * Math.sin(angle))
            )
        );
        vertList.push(center);
    }

    return {
        vertList: vertList,
        glShape: gl.TRIANGLE_STRIP
    };
};

Geometry.twoD.misc.f = function(dimensions) {
    return {
        vertList: [
            //left column
            new Vec2(0, 0),
            new Vec2(dimensions.x / 3, 0),
            new Vec2(dimensions.x / 3, dimensions.y),
            new Vec2(dimensions.x / 3, dimensions.y),
            new Vec2(0, dimensions.y),
            new Vec2(0, 0),

            //top rung
            new Vec2(dimensions.x / 3, 0),
            new Vec2(dimensions.x, 0),
            new Vec2(dimensions.x, dimensions.y / 5),
            new Vec2(dimensions.x, dimensions.y / 5),
            new Vec2(0, dimensions.y / 5),
            new Vec2(dimensions.x / 3, 0),

            //middle rung
            new Vec2(dimensions.x / 3, dimensions.y * 0.45),
            new Vec2(dimensions.x * 0.9, dimensions.y * 0.45),
            new Vec2(dimensions.x * 0.9, dimensions.y * 0.65),
            new Vec2(dimensions.x * 0.9, dimensions.y * 0.65),
            new Vec2(dimensions.x / 3, dimensions.y * 0.65),
            new Vec2(dimensions.x / 3, dimensions.y * 0.45)
        ],
        glShape: gl.TRIANGLES
    };
};
Geometry.twoD.misc.grid = function(dimensions, cellsHor, cellsVert) {
    var vertList = [];

    var cellSizeHor = dimensions.x / cellsHor;
    var cellSizeVert = dimensions.y / cellsVert;

    for (var i = 0; i < dimensions.x + cellSizeVert; i += cellSizeHor) {
        vertList = vertList.concat([
            new Vec2(i, dimensions.y),
            new Vec2(i, 0)
        ]);
    }
    for (var i = 0; i < dimensions.y; i += cellSizeVert) {
        vertList = vertList.concat([
            new Vec2(0, i),
            new Vec2(dimensions.x, i)
        ]);
    }

    return {
        vertList: vertList,
        glShape: gl.LINES
    };
};
// Geometry.threeD.primitive.plane = function(dimensions, scale) {
//     var dimensions = axis.clone();
//     //PLANE: a*x + b*y + c*z + d = 0
//    
//    
//    
//     return {
//         vertList: [
//             new Vec3()
//         ],
//         glShape: gl.TRIANGLES
//     };
// };
Geometry.threeD.primitive.cube = function(dimensions) {
    var topLeftFront = new Vec3(0, dimensions.y, 0),
        topRightFront = new Vec3(dimensions.x, dimensions.y, 0),
        bottomLeftFront = new Vec3(0, 0, 0),
        bottomRightFront = new Vec3(dimensions.x, 0, 0),
        topLeftBack = new Vec3(0, dimensions.y, dimensions.z),
        topRightBack = new Vec3(dimensions.x, dimensions.y, dimensions.z),
        bottomLeftBack = new Vec3(0, 0, dimensions.z),
        bottomRightBack = new Vec3(dimensions.x, 0, dimensions.z);
    return {
        vertList: [
            //face 1 (front)
            bottomLeftFront, topLeftFront, topRightFront,
            topRightFront, bottomRightFront, bottomLeftFront,

            // face 2 (back)
            bottomLeftBack, topLeftBack, topRightBack,
            topRightBack, bottomRightBack, bottomLeftBack,

            //face 3 (top)
            topLeftFront, topLeftBack, topRightBack,
            topRightBack, topRightFront, topLeftFront,

            //face 4 (bottom)
            bottomLeftFront, bottomLeftBack, bottomRightBack,
            bottomRightBack, bottomRightFront, bottomLeftFront,

            //face 5 (left)
            bottomLeftFront, bottomLeftBack, topLeftBack,
            topLeftBack, topLeftFront, bottomLeftFront,

            //face 6 (right)
            bottomRightFront, bottomRightBack, topRightBack,
            topRightBack, topRightFront, bottomRightFront
        ],
        normals: [
            //face 1 (front)
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),

            // face 2 (back)
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),

            //face 3 (top)
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),

            //face 4 (bottom)
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),

            //face 5 (left)
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),

            //face 6 (right)
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),

        ],
        glShape: gl.TRIANGLES
    };
};
Geometry.threeD.primitive.squarePyramid = function(dimensions) {
    var bottomLeftFront = new Vec3(0, 0, 0),
        bottomLeftBack = new Vec3(0, 0, dimensions.z),
        bottomRightFront = new Vec3(dimensions.x, 0, 0),
        bottomRightBack = new Vec3(dimensions.x, 0, dimensions.z),
        top = new Vec3(dimensions.x / 2, dimensions.y, dimensions.z / 2);
    return {
        vertList: [
            //face 1 (bottom) (two triangles)
            bottomLeftFront, bottomLeftBack, bottomRightBack,
            bottomLeftFront, bottomRightBack, bottomRightFront,

            //face 2 (front) (triangle)
            bottomLeftFront, top, bottomRightFront,
            //face 2 (back) (triangle)
            bottomLeftBack, top, bottomRightBack,
            //face 2 (left) (triangle)
            bottomLeftFront, top, bottomLeftBack,
            //face 2 (right) (triangle)
            bottomRightFront, top, bottomRightBack
        ],
        normals: [
            //face 1 (bottom) (two triangles)
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),

            //face 2 (front) (triangle)
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),

            //face 2 (back) (triangle)
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),

            //face 2 (left) (triangle)
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),

            //face 2 (right) (triangle)
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
        ],
        glShape: gl.TRIANGLES
    };
};
Geometry.threeD.primitive.trianglePyramid = function(dimensions) {
    var left = new Vec3(0, 0, dimensions.z),
        right = new Vec3(dimensions.x, 0, dimensions.z),
        front = new Vec3(dimensions.x / 2, 0, 0),
        top = new Vec3(dimensions.x / 2, dimensions.y, dimensions.z / 1.8);
    return {
        vertList: [
            //face 1 (bottom)
            front, left, right,

            //face 3 (back)
            left, top, right,

            //face 2 (left)
            front, left, top,

            //face 4 (right)
            right, top, front
        ],
        normals: [
            //TODO NOT EXACTLY RIGHT?
            //face 1 (bottom)
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),

            //face 3 (back)
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),

            //face 2 (left)
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),

            //face 4 (right)
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0)
        ],
        glShape: gl.TRIANGLES
    };
};
Geometry.threeD.primitive.prism = function(dimensions) {
    var leftBack = new Vec3(0, 0, dimensions.z),
        leftFront = new Vec3(0, 0, 0),
        rightBack = new Vec3(dimensions.x, 0, dimensions.z),
        rightFront = new Vec3(dimensions.x, 0, 0),
        topBack = new Vec3(dimensions.x / 2, dimensions.y, dimensions.z),
        topFront = new Vec3(dimensions.x / 2, dimensions.y, 0);
    return {
        vertList: [
            //face 5 (bottom) (rectangle)
            leftFront, leftBack, rightBack,
            rightBack, rightFront, leftFront,
            //face 4 (front) (triangle)
            leftFront, topFront, rightFront,
            //face 1 (back) (triangle)
            leftBack, topBack, rightBack,
            //face 2 (left) (rectangle)
            leftFront, topBack, topFront,
            leftFront, leftBack, topBack,
            //face 3 (right) (rectangle)
            rightFront, topBack, topFront,
            rightFront, rightBack, topBack


        ],
        normals: [
            //face 5 (bottom) (rectangle)
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            //face 4 (front) (triangle)
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            //face 1 (back) (triangle)
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),

            //face 2 (left) (rectangle)
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),

            //face 3 (right) (rectangle)
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0)
        ],
        glShape: gl.TRIANGLES
    };
};
Geometry.threeD.primitive.cylinder = function(dimensions) {
    //TODO this (and all other circle-based shapes) is not great)
    //TODO triangle fans to make up the bottoms...how do? requires special rendering treatment...

    var vertList = [];
    var radius = ((dimensions.x + dimensions.z) / 2) / 2;
    var twoPi = 2 * Math.PI;
    var center = dimensions.clone();
    center.scalarMult(0.5);

    var centerBottom = center.clone();
    centerBottom.y = 0;

    var centerTop = center.clone();
    centerTop.y = dimensions.y;

    // var startBottom = new Vec3(
    //     radius * Math.cos(0) + centerBottom.x,
    //     centerBottom.y,
    //     radius * Math.sin(0) + centerBottom.z
    // );
    // var startTop = new Vec3(
    //     radius * Math.cos(0) + centerBottom.x,
    //     centerTop.y,
    //     radius * Math.sin(0) + centerBottom.z
    // );

    for (var i = 0; i < 22; i++) {
        var step = twoPi / 20;

        vertList.push(
            new Vec3(
                radius * Math.cos(i * step) + centerBottom.x,
                (i % 2 == 0 ? centerTop.y : centerBottom.y),
                radius * Math.sin(i * step + radius * 2 * step) + centerBottom.z
            )
        );
    }

    return {
        vertList: vertList,
        glShape: gl.TRIANGLE_STRIP
    };
};
Geometry.threeD.primitive.cone = function(dimensions) {
    //TODO this (and all other circle-based shapes) is not great)
    //TODO triangle fans to make up the bottom...how do? requires special rendering treatment...

    var vertList = [];
    var radius = ((dimensions.x + dimensions.y) / 2) / 2;
    var twoPi = 2 * Math.PI;
    var center = dimensions.clone();
    center.scalarMult(0.5);

    var top = center.clone();
    top.y = dimensions.y;

    var bottom = top.clone();
    bottom.y = 0;

    for (var i = 0; i < 22; i++) {
        var angle = twoPi * i / 20;

        vertList.push(
            new Vec3(
                center.x + (radius * Math.cos(angle)),
                bottom.y,
                center.z + (radius * Math.sin(angle))
            )
        );
        vertList.push(top);
    }

    return {
        vertList: vertList,
        glShape: gl.TRIANGLE_STRIP
    };
};
Geometry.threeD.primitive.sphere = function(dimensions) {
    
};
Geometry.threeD.primitive.wireCube = function(dimensions) {
    return {
        vertList: [
            //back face
            new Vec3(0, 0, 0),
            new Vec3(dimensions.x, 0, 0),

            new Vec3(dimensions.x, 0, 0),
            new Vec3(dimensions.x, dimensions.y, 0),

            new Vec3(dimensions.x, dimensions.y, 0),
            new Vec3(0, dimensions.y, 0),

            new Vec3(0, dimensions.y, 0),
            new Vec3(0, 0, 0),

            //connectors
            new Vec3(0, 0, 0),
            new Vec3(0, 0, dimensions.z),

            new Vec3(dimensions.x, 0, 0),
            new Vec3(dimensions.x, 0, dimensions.z),

            new Vec3(dimensions.x, dimensions.y, 0),
            new Vec3(dimensions.x, dimensions.y, dimensions.z),

            new Vec3(0, dimensions.y, 0),
            new Vec3(0, dimensions.y, dimensions.z),

            //front face
            new Vec3(0, 0, dimensions.z),
            new Vec3(dimensions.x, 0, dimensions.z),

            new Vec3(dimensions.x, 0, dimensions.z),
            new Vec3(dimensions.x, dimensions.y, dimensions.z),

            new Vec3(dimensions.x, dimensions.y, dimensions.z),
            new Vec3(0, dimensions.y, dimensions.z),

            new Vec3(0, dimensions.y, dimensions.z),
            new Vec3(0, 0, dimensions.z),
        ],
        glShape: gl.LINES
    };
};
Geometry.threeD.primitive.line3D = function(direction) {
    return {
        vertList: [
                new Vec3(0, 0, 0),
                direction
        ],
        glShape: gl.LINES
    };
};
Geometry.threeD.misc.f = function(dimensions) {
    var topLeftFront = new Vec3(0, dimensions.y, 0),
        topLeftBack = new Vec3(0, dimensions.y, dimensions.z),
        topRightFront = new Vec3(dimensions.x, dimensions.y, 0),
        topRightBack = new Vec3(dimensions.x, dimensions.y, dimensions.z),
        leftColTopRightFront = new Vec3(dimensions.x / 4, dimensions.y, 0),
        leftColTopRightBack = new Vec3(dimensions.x / 4, dimensions.y, dimensions.z),
        leftColBottomRightFront = new Vec3(dimensions.x / 4, 0, 0),
        leftColBottomRightBack = new Vec3(dimensions.x / 4, 0, dimensions.z),
        bottomLeftFront = new Vec3(0, 0, 0),
        bottomLeftBack = new Vec3(0, 0, dimensions.z),
        topRungBottomLeftFront = new Vec3(dimensions.x / 4, dimensions.y / 1.35, 0),
        topRungBottomLeftBack = new Vec3(dimensions.x / 4, dimensions.y / 1.35, dimensions.z),
        topRungBottomRightFront = new Vec3(dimensions.x, dimensions.y / 1.35, 0),
        topRungBottomRightBack = new Vec3(dimensions.x, dimensions.y / 1.35, dimensions.z),
        middleRungTopLeftFront = new Vec3(dimensions.x / 4, dimensions.y / 3.25, 0),
        middleRungTopLeftBack = new Vec3(dimensions.x / 4, dimensions.y / 3.25, dimensions.z),
        middleRungTopRightFront = new Vec3(dimensions.x / 1.35, dimensions.y / 3.25, 0),
        middleRungTopRightBack = new Vec3(dimensions.x / 1.35, dimensions.y / 3.25, dimensions.z),
        middleRungBottomLeftFront = new Vec3(dimensions.x / 4, dimensions.y / 1.75, 0),
        middleRungBottomLeftBack = new Vec3(dimensions.x / 4, dimensions.y / 1.75, dimensions.z),
        middleRungBottomRightFront = new Vec3(dimensions.x / 1.35, dimensions.y / 1.75, 0),
        middleRungBottomRightBack = new Vec3(dimensions.x / 1.35, dimensions.y / 1.75, dimensions.z);

    return {
       vertList: [
           // left column front
           topLeftFront, bottomLeftFront, leftColTopRightFront,
           bottomLeftFront, leftColBottomRightFront, leftColTopRightFront,

           // top rung front
           leftColTopRightFront, topRungBottomLeftFront, topRightFront,
           topRungBottomLeftFront, topRungBottomRightFront, topRightFront,
           
           // middle rung front
           middleRungTopLeftFront, middleRungTopRightFront, middleRungBottomRightFront,
           middleRungTopLeftFront, middleRungBottomLeftFront, middleRungBottomRightFront,
           
           // left column back
           topLeftBack, bottomLeftBack, leftColTopRightBack,
           bottomLeftBack, leftColBottomRightBack, leftColTopRightBack,

           // top rung back
           leftColTopRightBack, topRungBottomLeftBack, topRightBack,
           topRungBottomLeftBack, topRungBottomRightBack, topRightBack,

           // middle rung back
           middleRungTopLeftBack, middleRungTopRightBack, middleRungBottomRightBack,
           middleRungTopLeftBack, middleRungBottomLeftBack, middleRungBottomRightBack,

           // top
           topLeftFront, topRightFront, topRightBack,
           topLeftFront, topRightBack, topLeftBack,

           // top rung right
           topRightFront, topRungBottomRightFront, topRungBottomRightBack,
           topRightFront, topRungBottomRightBack, topRightBack,

           // under top rung
           topRungBottomLeftFront, topRungBottomLeftBack, topRungBottomRightBack,
           topRungBottomLeftFront, topRungBottomRightBack, topRungBottomRightFront,

           // between top rung and middle
           topRungBottomLeftFront, middleRungTopLeftBack, topRungBottomLeftBack,
           topRungBottomLeftFront, middleRungTopLeftFront, middleRungTopLeftBack,

           // top of middle rung
           middleRungTopLeftFront, middleRungTopRightBack, middleRungTopLeftBack,
           middleRungTopLeftFront, middleRungTopRightFront, middleRungTopRightBack,

           // right of middle rung
           middleRungTopRightFront, middleRungBottomRightBack, middleRungTopRightBack,
           middleRungTopRightFront, middleRungBottomRightFront, middleRungBottomRightBack,

           // bottom of middle rung
           middleRungBottomLeftFront, middleRungBottomLeftBack, middleRungBottomRightBack,
           middleRungBottomLeftFront, middleRungBottomRightBack, middleRungBottomRightFront,

           // right of bottom
           middleRungBottomLeftFront, leftColBottomRightBack, middleRungBottomLeftBack,
           middleRungBottomLeftFront, leftColBottomRightFront, leftColBottomRightBack,

           // bottom
           bottomLeftFront, bottomLeftBack, leftColBottomRightBack,
           bottomLeftFront, leftColBottomRightBack, leftColBottomRightFront,

           // left side
           topLeftFront, topLeftBack, bottomLeftBack,
           topLeftFront, bottomLeftBack, bottomLeftFront
       ],
        normals: [
            // left column front
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),

            // top rung front
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),

            // middle rung front
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),
            new Vec3(0, 0, 1),

            // left column back
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),

            // top rung back
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),

            // middle rung back
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),
            new Vec3(0, 0, -1),

            // top
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),

            // top rung right
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),

            // under top rung
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),

            // between top rung and middle
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),

            // top of middle rung
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 1, 0),

            // right of middle rung
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),

            // bottom of middle rung
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),

            // right of bottom
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(1, 0, 0),

            // bottom
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),
            new Vec3(0, -1, 0),

            // left side
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0),
            new Vec3(-1, 0, 0)
        ],
        glShape: gl.TRIANGLES
    };
};
Geometry.threeD.misc.wireF = function(dimensions) {
    return {
        vertList: [
            //front face
            new Vec3(0, dimensions.y, 0),
            new Vec3(0, 0, 0),
            new Vec3(0, 0, 0),
            new Vec3(dimensions.x / 4, 0, 0),
            new Vec3(dimensions.x / 4, 0, 0),
            new Vec3(dimensions.x / 4, dimensions.y / 3.25, 0),
            new Vec3(dimensions.x / 4, dimensions.y / 3.25, 0),
            new Vec3(dimensions.x / 1.35, dimensions.y / 3.25, 0),
            new Vec3(dimensions.x / 1.35, dimensions.y / 3.25, 0),
            new Vec3(dimensions.x / 1.35, dimensions.y / 1.75, 0),
            new Vec3(dimensions.x / 1.35, dimensions.y / 1.75, 0),
            new Vec3(dimensions.x / 4, dimensions.y / 1.75, 0),
            new Vec3(dimensions.x / 4, dimensions.y / 1.75, 0),
            new Vec3(dimensions.x / 4, dimensions.y / 1.35, 0),
            new Vec3(dimensions.x / 4, dimensions.y / 1.35, 0),
            new Vec3(dimensions.x, dimensions.y / 1.35, 0),
            new Vec3(dimensions.x, dimensions.y / 1.35, 0),
            new Vec3(dimensions.x, dimensions.y, 0),
            new Vec3(dimensions.x, dimensions.y, 0),
            new Vec3(0, dimensions.y, 0),

            //connectors
            new Vec3(0, 0, 0),
            new Vec3(0, 0, dimensions.z),
            new Vec3(dimensions.x / 4, 0, 0),
            new Vec3(dimensions.x / 4, 0, dimensions.z),
            new Vec3(dimensions.x / 4, dimensions.y / 3.25, 0),
            new Vec3(dimensions.x / 4, dimensions.y / 3.25, dimensions.z),
            new Vec3(dimensions.x / 1.35, dimensions.y / 3.25, 0),
            new Vec3(dimensions.x / 1.35, dimensions.y / 3.25, dimensions.z),
            new Vec3(dimensions.x / 1.35, dimensions.y / 1.75, 0),
            new Vec3(dimensions.x / 1.35, dimensions.y / 1.75, dimensions.z),
            new Vec3(dimensions.x / 4, dimensions.y / 1.75, 0),
            new Vec3(dimensions.x / 4, dimensions.y / 1.75, dimensions.z),
            new Vec3(dimensions.x / 4, dimensions.y / 1.35, 0),
            new Vec3(dimensions.x / 4, dimensions.y / 1.35, dimensions.z),
            new Vec3(dimensions.x, dimensions.y / 1.35, 0),
            new Vec3(dimensions.x, dimensions.y / 1.35, dimensions.z),
            new Vec3(dimensions.x, dimensions.y, 0),
            new Vec3(dimensions.x, dimensions.y, dimensions.z),
            new Vec3(0, dimensions.y, 0),
            new Vec3(0, dimensions.y, dimensions.z),

            //back face
            new Vec3(0, dimensions.y, dimensions.z),
            new Vec3(0, 0, dimensions.z),
            new Vec3(0, 0, dimensions.z),
            new Vec3(dimensions.x / 4, 0, dimensions.z),
            new Vec3(dimensions.x / 4, 0, dimensions.z),
            new Vec3(dimensions.x / 4, dimensions.y / 3.25, dimensions.z),
            new Vec3(dimensions.x / 4, dimensions.y / 3.25, dimensions.z),
            new Vec3(dimensions.x / 1.35, dimensions.y / 3.25, dimensions.z),
            new Vec3(dimensions.x / 1.35, dimensions.y / 3.25, dimensions.z),
            new Vec3(dimensions.x / 1.35, dimensions.y / 1.75, dimensions.z),
            new Vec3(dimensions.x / 1.35, dimensions.y / 1.75, dimensions.z),
            new Vec3(dimensions.x / 4, dimensions.y / 1.75, dimensions.z),
            new Vec3(dimensions.x / 4, dimensions.y / 1.75, dimensions.z),
            new Vec3(dimensions.x / 4, dimensions.y / 1.35, dimensions.z),
            new Vec3(dimensions.x / 4, dimensions.y / 1.35, dimensions.z),
            new Vec3(dimensions.x, dimensions.y / 1.35, dimensions.z),
            new Vec3(dimensions.x, dimensions.y / 1.35, dimensions.z),
            new Vec3(dimensions.x, dimensions.y, dimensions.z),
            new Vec3(dimensions.x, dimensions.y, dimensions.z),
            new Vec3(0, dimensions.y, dimensions.z),
        ],
        glShape: gl.LINES
    };
};
var _getGeometry = function(name, dimensions, gridCellsHor, gridCellsVert) {
    switch (name) {
        case "line":
            return Geometry.twoD.primitive.line(dimensions.x || dimensions.y);
        case "line3D":
            return Geometry.threeD.primitive.line3D(dimensions);
        case "rect":
            return Geometry.twoD.primitive.rect(dimensions);
        case "triangle":
            return Geometry.twoD.primitive.triangle(dimensions);
        case "pentagon":
            return Geometry.twoD.primitive.pentagon(dimensions);
        case "circle":
            return Geometry.twoD.primitive.circle(dimensions);
        case "f":
            return Geometry.twoD.misc.f(dimensions);
        case "grid":
            return Geometry.twoD.misc.grid(dimensions, gridCellsHor, gridCellsVert);
        case "cube":
            return Geometry.threeD.primitive.cube(dimensions);
        case "squarePyramid":
            return Geometry.threeD.primitive.squarePyramid(dimensions);
        case "trianglePyramid":
            return Geometry.threeD.primitive.trianglePyramid(dimensions);
        case "prism":
            return Geometry.threeD.primitive.prism(dimensions);
        case "cone":
            return Geometry.threeD.primitive.cone(dimensions);
        case "cylinder":
            return Geometry.threeD.primitive.cylinder(dimensions);
        case "sphere":
            return Geometry.threeD.primitive.sphere(dimensions);
        case "wireCube":
            return Geometry.threeD.primitive.wireCube(dimensions);
        case "f3D":
            return Geometry.threeD.misc.f(dimensions);
        case "wireF3D":
            return Geometry.threeD.misc.wireF(dimensions);
        case "plane3D":
            return Geometry.threeD.primitive.plane(dimensions);
    }
};