#TODO

##ENGINE
- Camera
- Maybe rewrite of renderer?
    - ~~Want shader per object not per shape~~
        - ~~Entity component: shader~~
        - ~~EntityManager groups entities by shader (then by shape?) and configs the renderer as such for calls~~
            - ~~This will require more sophisticated rendersettings construction
              As well as new shader-defining capabilities for RenderSettings~~
            - ~~Render calls are minimised by the groupings~~
    - Need to work on a switch to perspective projection
        - Facilitates cameras both 2D and 3D
        - (The style of perspective projection used in the 3D vert shaders)
            - (need a 2D version)
    - Entity changes:
        - ~~shader component~~
        - ~~maybe components to represent everything the entitymanager will need to construct rendersettings?~~
        - MODEL MATRIX representing the transformation of the entity?
            - maybe this is constructed by the entity manager?
            - this is a good idea - allows for built-in scaling and rotation
            - needs to be an attribute of a shader? Think about it while writing the entity-rendersettings definition thingy
- Cameras
    - Need to be generic for general use
        - have states (both 2D and 3D)
            - follow (a given target)
            - pan (a given path or direction)
            - showall (zoom to fit a given group of entities (based on their distances from one another))
        - have behavior
            - followTarget
                - an entity to follow
                - switches to the follow state
            - setPathWaypoints
                - an array of waypoint vectors representing points in space
                - switches to the pan state with a path to follow
            - setPathDirection
                - a vector representing a direction to travel in
                - switches to the pan state with a direction to travel in
            - setZoomToShow
                - an array of Entities to fit in the screen
        - Is represented as a "world transformation" matrix that can incorporate all 3 transformations
            - HOW TO HANDLE THE RENDERING ASPECT OF CAMERAS?
            - SIMPLE - IF A CAMERA IS REPRESENTED AS A COMPOND MATRIX TRANSFORMATION, THE POSITION DATA OF ALL ENTITIES CAN JUST BE MULTIPLIED BY THIS MATRIX
            - DON'T MAKE A DECISION UNTIL YOU'VE DONE THE CAMERA TUTORIAL ON LEARNWEBGL
                - basically, somehow the camera transformation has to be applied to all vertices
                    - natural choice: uniform
                    - BUT: this makes a weird dependency - all shaders, including those written at app-level, have to have a camera uniform?
                        - What about games that lack the need for a camera?
                            - Does camera become a necessary game setup requirement?
                            
    - 2D and 3D Camera variants due to the differences in maths
    - Should the Camera be an Entity?
        - Entity can have transformation in space, doesn't need to be rendered (no vertices)
        - A camera should at least *manage* an Entity
            - This might help later on with being able to show cameras by adding a shape (+ shader) to the entity

##MOVEMENT
- Smooth the mouse target movement?
- physics-ey? (Acceleration/deceleration)? (fix physicsSystem in this regard)

##ENEMIES
- Superform enemies
    - all 1.5x size, different (darker?) color, change abilities:
        - triangle: follows player (not directly)
        - square: moves faster
        - pentagon: moves? better idea?
- New shapes
    - ~~Circle~~
        - ~~Super fast straight-line, towards player's pos at spawn~~
        - ~~Doesn't bounce off screen edges~~
        - Superform: 4 circles spawn at corners, heading towards player pos (destroy each other on contact)
    - Line (thin rect not actual line)
        - Like a ping pong paddle in movement, shoots in front or behind from center (towards player)
        - Superform: tracks player position and moves to hit with bullets (not very intelligent or it'll be too hard)

##PLAYER
- Change color on shape change
- New shapes
    - Circle
        - homing shots
    - Line (thin rect not actual line)
        - Shoots out of both ends as well as from center; moves and rotates like the square form
- Jiggle shape multiplier requirements to balance progression
- Special abilities (1 for each shape; 2 to start, awarded for each 100 (or more?) enemy kills)
    - triangle
        - charge forward; twice size, destroy all that you hit
    - square
        - Fan-shot from both ends
    - pentagon
        - 5 shots from all points; shots bounce 
    - circle
        - a fair few shots around the circle, shots home
    - line
        - wave of bullets emits from line edges, covering a plus shape on the board
##LEVEL
- Balance the wave gen

##BACKGROUND
- Random color sequence (color the corners and allow for that in vertex construction; change corner colors during runtime)
- Scaling/"bouncing-ish-effect"?

##UI
- Better paneling
- Flashing text, changing color + scale etc on events like point gain, multiplier milestone hit, etc

##GENERAL
- ~~Fix mouse positioning on pointerLock~~
- ~~Show X at mousepos in all states~~
- ~~Remove LD info from intro menu; replace with better tutorial~~
- ~~Fix flashing text~~
- (eventually) neon! / partial 3D!?
    - Definitely an animate-able 3D grid/net
    - Wireframe entities?
- FIX ROTATION
    - (good evidence of underlying problem: circles become ovals when rotated with the transform's angle property)