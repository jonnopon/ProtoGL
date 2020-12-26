var init = function () {
    var game = new Game(1024, 768);
    game.setBackgroundColor(new Vec4(1, 1, 1, 1));
    game.displayStats = true;

    //STEP 1: attach init data to the game object (loaded upon game initialisation)
    game.initData = {

    };
    //STEP 2: attach initialisation function to the game (called during game.start())
    game.initFunc = function () {
        var vPerspective = VERTSHADERS3D["perspective-1"]();
        // var vert2D = VERTSHADERS2D["new-transform-colored"]();
        var fPerspective = FRAGSHADERS["colored"];

        var vLighting = VERTSHADERS3D["point-lighting-per-fragment"]();
        var fLighting = FRAGSHADERS["point-lighting-per-fragment"]();
        // var frag2D = FRAGSHADERS["colored"];

        // var uniform3D = vert3D.globalUniforms;
        // uniform3D = uniform3D.concat(frag3D.globalUniforms);
        // var iUniform3D = vert3D.instanceUniforms + frag3D.instanceUniforms;
        // iUniform3D = iUniform3D.concat(frag3D.instanceUniforms);
        var perspective = {
            name: "perspective",
            vertSrc: vPerspective.src,
            fragSrc: fPerspective,
            attributes: vPerspective.attributes,
            dataPerVert: vPerspective.dataPerVert,
            vertUniforms: {
                global: vPerspective.globalUniforms,
                instance: vPerspective.instanceUniforms
            },
            fragUniforms: {}
        };
        this.addShader(perspective);

        var lighting = {
            name: "lighting",
            vertSrc: vLighting.src,
            fragSrc: fLighting.src,
            attributes: vLighting.attributes,
            dataPerVert: vLighting.dataPerVert,
            vertUniforms: {
                global: vLighting.globalUniforms,
                instance: vLighting.instanceUniforms
            },
            fragUniforms: {
                global: fLighting.globalUniforms,
                instance: fLighting.instanceUniforms
            },
            // instanceUniforms: iUniform3D
        };
        this.addShader(lighting);

        // var shader2D = {
        //     name: "2DShader",
        //     vertSrc: vert2D.src,
        //     fragSrc: frag,
        //     attributes: vert2D.attributes,
        //     dataPerVert: vert2D.dataPerVert,
        //     globalUniforms: vert2D.globalUniforms,
        //     instanceUniforms: vert2D.instanceUniforms
        // };
        // this.addShader(shader2D);

        this.renderer.addCamera(new Camera3D(new Vec3(0, 0, 1000)));

        this.switchToState("2DState");
    };

    //STEP 3: attach reinit data to the game object (loaded upon game re-initialisation)
    game.reinitData = game.initData;

    //STEP 4: attach re-initialisation function to the game (called during game.reinit())
    game.reinitFunc = function () {
        // this.displayStats = true;

        this.switchToState("2DState");
    };

    //STEP 5: attach utility functions to game - global game behaviors accessible anywhere
    game.genStuff = function () {
        for (var i = 0; i < 250; i++) {
            var r = randomBetween(1, 900);
            var e = undefined;

            var position = new Vec3(randomBetween(-500, 500), randomBetween(-500, 500), randomBetween(-500, 500));
            var col = new Vec4(randomBetween(1, 255), randomBetween(1, 255), randomBetween(1, 255), 0.9);

            if (r < 100) {
                e = Cube(position, col);
            }
            else if (r < 200) {
                e = Cone(position, col);
            }
            else if (r < 300) {
                e = Cylinder(position, col);
            }
            else if (r < 400) {
                e = F3D(position, col);
            }
            else if (r < 500) {
                e = Prism(position, col);
            }
            else if (r < 600) {
                e = SquarePyramid(position, col);
            }
            else if (r < 700) {
                e = TrianglePyramid(position, col);
            }
            else if (r < 800) {
                e = WireCube(position, col);
            }
            else {
                e = WireF3D(position, col);
            }

            e.components.transform3D.scale = new Vec3(randomBetween(0.2, 1), randomBetween(0.2, 1), randomBetween(0.2, 1));
            // e.components.transform3D.forwardVelocity = randomBetween(1, 100);
            e.components.transform3D.dimensions = e.components.shape.dimensions = new Vec3(randomBetween(50, 250), randomBetween(50, 250), randomBetween(50, 250));
            e.components.transform3D.angle = new Vec3(degToRad(randomBetween(1, 150)), degToRad(randomBetween(1, 150)), degToRad(randomBetween(1, 150)));
            e.ROTATION = randomBetween(1, 5);
            e.components.transform3D.velocity = new Vec3(randomBetween(-15, 15), randomBetween(-15, 15), randomBetween(-15, 15));
            e.components.transform3D.moveType = 1;

            e.onUpdate = function () {
                switch (this.ROTATION) {
                    case 1:
                        this.components.transform3D.angle.x += degToRad(1.5);
                        break;
                    case 2:
                        this.components.transform3D.angle.y += degToRad(1.5);
                        break;
                    case 3:
                        this.components.transform3D.angle.z += degToRad(1.5);
                        break;
                    case 4:
                        this.components.transform3D.angle.x += degToRad(1.5);
                        this.components.transform3D.angle.y += degToRad(1.5);
                        break;
                    case 5:
                        this.components.transform3D.angle.x += degToRad(1.5);
                        this.components.transform3D.angle.z += degToRad(1.5);
                    default:
                        this.components.transform3D.angle.x += degToRad(1.5);
                }
            };

            this.addEntity(e);
        }

        this.displayStats = false;
    };

    //STEP 6: add the states to the game
    // game.addState(State2D());
    game.addState(State2D());

    //STEP 7: start the game!
    game.start();
};