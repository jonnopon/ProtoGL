var State3D = function() {
    return new State("3DState",
        function init() {
            GAME.clearEntities();

            GAME.addEntity(Plane(new Vec3(0, -100, 0), new Vec3(1, 0, 1), 10000, new Vec4(200, 200, 200, 1)));

            for (var z = -5500; z < 4000; z += 1000) {
                // GAME.addEntity(Cube(new Vec3(-175, 0, z), new Vec4(255, 0, 200, 1)));
                // GAME.addEntity(Cone(new Vec3(0, 0, z), new Vec4(150, 200, 125, 1)));
                // GAME.addEntity(SquarePyramid(new Vec3(175, 0, z), new Vec4(200, 100, 125, 1)));
                // GAME.addEntity(TrianglePyramid(new Vec3(175, 0, z + 150), new Vec4(50, 100, 150, 1)));
                // GAME.addEntity(Cylinder(new Vec3(-175, 0, z + 150), new Vec4(255, 100, 55, 1)));
                // GAME.addEntity(Prism(new Vec3(0, 0, z + 150), new Vec3(100, 100, -100), new Vec4(50, 175, 75, 1)));
                // GAME.addEntity(WireF3D(new Vec3(175, 0, z + 300), new Vec4(255, 255, 0, 1)));
                // GAME.addEntity(WireCube(new Vec3(-175, 0, z + 300), new Vec4(250, 50, 200, 1)));
                // GAME.addEntity(F3D(new Vec3(0, 0, z + 300), new Vec4(250, 50, 200, 1)));
            }

            for (var i = 0; i < 15; i++) {
                var angle = i * Math.PI * 2 / 15;

                var x = Math.cos(angle) * 350;
                var z = Math.sin(angle) * 350;
                // GAME.addEntity(Cube(new Vec3(x, 0, z), new Vec4(255, 0, 0, 1)));
                GAME.addEntity(Cube(new Vec3(x, 0, z), new Vec4(255, 255, 255, 1)));

            }

            for (var i = 0; i < 15; i++) {
                var angle = i * Math.PI * 2 / 15;

                var x = Math.cos(angle) * 350;
                var z = Math.sin(angle) * 350;
                // GAME.addEntity(F3D(new Vec3(x + 850, 0, z), new Vec4(0, 255, 0, 1)));
                GAME.addEntity(F3D(new Vec3(x + 850, 0, z), new Vec4(255, 255, 255, 1)));

            }

            for (var i = 0; i < 15; i++) {
                var angle = i * Math.PI * 2 / 15;

                var x = Math.cos(angle) * 350;
                var z = Math.sin(angle) * 350;
                GAME.addEntity(TrianglePyramid(new Vec3(x - 850, 0, z), new Vec4(255, 255, 255, 1)));
                // GAME.addEntity(TrianglePyramid(new Vec3(x - 850, 0, z), new Vec4(0, 0, 255, 1)));

            }

            for (var i = 0; i < 15; i++) {
                var angle = i * Math.PI * 2 / 15;

                var x = Math.cos(angle) * 350;
                var z = Math.sin(angle) * 350;
                // GAME.addEntity(SquarePyramid(new Vec3(x, 0, z - 850), new Vec4(255, 255, 255, 1)));
                GAME.addEntity(SquarePyramid(new Vec3(x, 0, z - 850), new Vec4(255, 255, 255, 1)));

            }

            // GAME.addEntity(F3D(new Vec3(-150, 10, 4250), new Vec4(50, 255, 50, 1)));
            // GAME.addEntity(WireCube(new Vec3(0, 0, 4250), new Vec4(250, 50, 200, 1)));
            // GAME.addEntity(Cube(new Vec3(150, 10, 4250), new Vec4(50, 255, 50, 1)));
            // GAME.addEntity(SquarePyramid(new Vec3(150, 10, 3950), new Vec4(200, 100, 125, 1)));
            // GAME.addEntity(TrianglePyramid(new Vec3(0, 0, 4250), new Vec4(50, 100, 150, 1)));
            // GAME.addEntity(Prism(new Vec3(200, 0, 4250), new Vec3(100, 100, -100), new Vec4(150, 255, 175, 1)));


            // GAME.addEntity(Prism(new Vec3(0, 2400, -1500), new Vec3(5000, 5000, 1500), new Vec4(150, 150, 150, 0.95)));

            // var prism = Prism(new Vec3(-2400, 2400, 0), new Vec3(2500, 5000, 10000), new Vec4(150, 150, 150, 0.95))
            // prism.components.transform3D.angle.y = degToRad(90);
            // GAME.addEntity(prism);

            // prism = Prism(new Vec3(2400, 2400, 0), new Vec3(2500, 5000, 10000), new Vec4(150, 150, 150, 0.8));
            // GAME.addEntity(prism);
            //
            // prism = Prism(new Vec3(0, 3650, -10000), new Vec3(5000, 7500, 10000), new Vec4(150, 150, 150, 0.8));
            // GAME.addEntity(prism);
            //
            // prism = Prism(new Vec3(-1000, 3650, -10000), new Vec3(5000, 7500, 10000), new Vec4(150, 150, 150, 0.8));
            // GAME.addEntity(prism);
            //
            // prism = Prism(new Vec3(-2000, 3650, -10000), new Vec3(5000, 7500, 10000), new Vec4(150, 150, 150, 0.8));
            // GAME.addEntity(prism);
            //
            // prism = Prism(new Vec3(1000, 3650, -10000), new Vec3(5000, 7500, 10000), new Vec4(150, 150, 150, 0.8));
            // GAME.addEntity(prism);
            //
            // prism = Prism(new Vec3(2000, 3650, -10000), new Vec3(5000, 7500, 10000), new Vec4(150, 150, 150, 0.8));
            // GAME.addEntity(prism);
            //
            // prism = Prism(new Vec3(500, 3650, -10500), new Vec3(5000, 7500, 10000), new Vec4(150, 150, 150, 0.8));
            // GAME.addEntity(prism);
            //
            // prism = Prism(new Vec3(-500, 3650, -10500), new Vec3(5000, 7500, 10000), new Vec4(150, 150, 150, 0.8));
            // GAME.addEntity(prism);
            //
            // prism = Prism(new Vec3(750, 3650, -10500), new Vec3(5000, 7500, 10000), new Vec4(150, 150, 150, 0.8));
            // GAME.addEntity(prism);
            //
            // prism = Prism(new Vec3(-750, 3650, -10500), new Vec3(5000, 7500, 10000), new Vec4(150, 150, 150, 0.8));
            // GAME.addEntity(prism);
            //
            // prism = Prism(new Vec3(1600, 3650, -10500), new Vec3(5000, 7500, 10000), new Vec4(150, 150, 150, 0.8));
            // GAME.addEntity(prism);
            //
            // prism = Prism(new Vec3(-1600, 3650, -10500), new Vec3(5000, 7500, 10000), new Vec4(150, 150, 150, 0.8));
            // GAME.addEntity(prism);
            //
            //
            //
            // GAME.addEntity(Prism(new Vec3(2400, 2400, 0), new Vec3(5000, 5000, 75), new Vec4(150, 150, 150, 0.8)));


            //TODO: only need this right now because the physics system calculates the compute matrices
            //(though does that actually make some kind of sense? If physics is responsible for world transformation?)
            GAME.addSystem(PhysicsSystem3D);
        },
        function tick() {
            GAME.entityManager.update();
            GAME.entityManager.render();

            // if (GAME.inputHandler.isKeyDown(KEYCODES.enter)) {
            //     GAME.switchToState("2DState");
            // }

            if (GAME.inputHandler.isKeyDown(KEYCODES.space) && !GAME.hasGend) {
                GAME.genStuff();
                GAME.hasGend = true; 
            }

            //move forward / back
            if (GAME.inputHandler.isKeyDown(KEYCODES.w)) {
                GAME.renderer.camera.e.components.transform3D.forwardVelocity = -40;
            }
            else if (GAME.inputHandler.isKeyDown(KEYCODES.s)) {
                GAME.renderer.camera.e.components.transform3D.forwardVelocity = 40;
            }
            else {
                GAME.renderer.camera.e.components.transform3D.forwardVelocity = 0;
            }

            //move left / right
            if (GAME.inputHandler.isKeyDown(KEYCODES.a)) {
                GAME.renderer.camera.e.components.transform3D.rightVelocity = -40;
            }
            else if (GAME.inputHandler.isKeyDown(KEYCODES.d)) {
                GAME.renderer.camera.e.components.transform3D.rightVelocity = 40;
            }
            else {
                GAME.renderer.camera.e.components.transform3D.rightVelocity = 0;
            }

            //move up / down
            if (GAME.inputHandler.isKeyDown(KEYCODES.q)) {
                GAME.renderer.camera.e.components.transform3D.upVelocity = -40;
            }
            else if (GAME.inputHandler.isKeyDown(KEYCODES.e)) {
                GAME.renderer.camera.e.components.transform3D.upVelocity = 40;
            }
            else {
                GAME.renderer.camera.e.components.transform3D.upVelocity = 0;
            }

            //look up/down
            if (GAME.inputHandler.isKeyDown(KEYCODES.numPad8) ||
                GAME.inputHandler.isKeyDown(KEYCODES.upArrow)) {
                GAME.renderer.camera.e.components.transform3D.angle.x += degToRad(1);
            }
            else if (GAME.inputHandler.isKeyDown(KEYCODES.numPad5) ||
                GAME.inputHandler.isKeyDown(KEYCODES.downArrow)) {
                GAME.renderer.camera.e.components.transform3D.angle.x -= degToRad(1);
            }

            //look left / right
            if (GAME.inputHandler.isKeyDown(KEYCODES.numPad4) ||
                GAME.inputHandler.isKeyDown(KEYCODES.leftArrow)) {
                // GAME.renderer.camera.rotateY(GAME.renderer.camera.position, degToRad(1));
                GAME.renderer.camera.e.components.transform3D.angle.y += degToRad(1);
            }
            else if (GAME.inputHandler.isKeyDown(KEYCODES.numPad6) ||
                GAME.inputHandler.isKeyDown(KEYCODES.rightArrow)) {
                // GAME.renderer.camera.rotateY(GAME.renderer.camera.position, degToRad(-1));
                GAME.renderer.camera.e.components.transform3D.angle.y -= degToRad(1);
            }

            //rotate left / right
            if (GAME.inputHandler.isKeyDown(KEYCODES.numPad7)) {
                // GAME.renderer.camera.rotateY(GAME.renderer.camera.position, degToRad(1));
                GAME.renderer.camera.e.components.transform3D.angle.z += degToRad(1);
            }
            else if (GAME.inputHandler.isKeyDown(KEYCODES.numPad9)) {
                // GAME.renderer.camera.rotateY(GAME.renderer.camera.position, degToRad(-1));
                GAME.renderer.camera.e.components.transform3D.angle.z -= degToRad(1);
            }
        }
    );
};