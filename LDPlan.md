#Theme: Shapeshift

#Game Name: Shapeshift (typical)

##Genre: Shooter (Geom Wars-esque)

##Elevator: A top-down shooter based around primary shapes where the player can shapeshift to change playstyle/power up. Neon (hopefully) palette

###Requirements Left:
    - Overall
        - How 2 Neon?
        - ~~Shapes stuff for defining geometry + basic shapes~~
            - Pentagon
            - Hexagon?
            - Circle?
        - ~~Ability to grow and shrink shapes from an arbitrary centre point...would scaling work?~~
            - Doesn't work properly...
    - Player control
        - play with new ideas maybe; acceleration/linear motion?
    - ~~LevelSystem~~
        - (med priority) randomise a colour across the grid in a wave like pattern
        - (low priority) if time, figure out how to make a 3D net and wing it
    - Enemies
        - Pentagon
            - Shoots in some pattern from its points
                - random 2 spoke every shoot change
        - Circle?
            - Spawns and heads towards you (but does not follow you)
        - Hexagon?
            - Bomb? (destroys all enemies)
    - ShapeShift ability
        - Shapes:
            - ~~Triangle~~
                - ~~Shoot toward mouse (spray pattern?)~~
                - Best speed
            - ~~Square/Rect~~
                - ~~Shoot toward and away from mouse~~
                - Moderate speed
            - Pentagon
                - Shoot out of all 5 of your points
                - Slow speed
            - Circle?
                - Shoot a shockwave of bullets all around?
                - "Definitely gonna get hit" speed
    - Stuff I need entities to be able to do:
        - ~~acceleration~~ and deceleration
        - **Alternative**: find the math way to transform the positions (+ widths) to achieve actual geometric animations for shape switching)
    - Controls:
        - ~~WASD (ALSO ALLOW FOR FOREIGN KEYBOARDS): move~~
        - B: Bomb??
    - Rules:
        - Wave patterns
        - ~~Procedural?~~
            - ~~Number of enemies increases with time/points/multiplier?~~
            - Waves contain a mix of all enemies, where those enemies' thresholds are below the time/points/multiplier
        - Health is gained for x number of points or x multiplier milestone?