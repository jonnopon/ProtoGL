#Theme: Shapeshift

#Game Name: Shapeshift (typical)

##Genre: Shooter (Geom Wars-esque)

##Elevator: A top-down shooter based around primary shapes where the player can shapeshift to change playstyle/power up. Neon (hopefully) palette

###Requirements Left:
    - Overall
        - ~~How 2 Neon?~~
            - Not achieved with bloom as is necessary, out of scope for ld
            - chose arcadey colours from a neon palette
        - ~~Nicer UI~~
        - ~~Shapes stuff for defining geometry + basic shapes~~
            - Hexagon?
            - Circle?
        - ~~Ability to grow and shrink shapes from an arbitrary centre point...would scaling work?~~
            - Doesn't work properly...
    - Player control
        - play with new ideas maybe; acceleration/linear motion?
    - ~~LevelSystem~~
        - Milestone waves, replenishing health and weighing up enemy proportions given multiplier + wave
        - Milestone waves should be designed in some way
        - (med priority) randomise a colour across the grid in a wave like pattern
        - (low priority) if time, figure out how to make a 3D net and wing it
    - Enemies
        - Circle?
            - Spawns and heads towards you (but does not follow you)
        - Hexagon?
    - ShapeShift ability
        - Shapes:
            - ~~Triangle~~
                - Best speed
            - ~~Square/Rect~~
                - Moderate speed
            - ~~Pentagon~~
                - Slow speed
    - Controls:
        - ~~WASD (ALSO ALLOW FOR FOREIGN KEYBOARDS): move~~
        - B: Bomb??
    - Rules:
        - Wave patterns
        - ~~Procedural?~~
            - ~~Number of enemies increases with time/points/multiplier?~~
            - Waves contain a mix of all enemies, where those enemies' thresholds are below the time/points/multiplier
        - Health is gained for x number of points or x multiplier milestone?