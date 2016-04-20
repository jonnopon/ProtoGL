#TODO

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