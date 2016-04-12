#ProtoGL
A WebGL prototyping "engine" and game template - provides a sizeable, organised bed of boilerplate with a demo application serving as a template for any given project.
In active development. API, overall structure, engine capabilities and demo/template application are fluid.

##This Branch (Structural Changes)
The place to safely gut and replace the inheritance-based entity system in favour of a data-driven component-based one.
Also likely where a lot of main Game object changes and Renderer changes will take place, as well as the knock-ons for how the application itself must be written.

----

##Rough TODO
Not necessarily a complete list, definitely not in priority order 

- ***Rendering***
    - *Renderer*
        - Stop assuming uniform types!
        - Split render calls for different kinds of geometry? (future concern?)
        - Split 2D and 3D rendering completely?
        - Use. Element. Arrays. (where appropriate if not everywhere)
    - *RendererSettings*
        - Add uniform type to uniform definition (see above)
        - Revise usefulness going forward
    - *Shaders*
        - Split 2D and 3D shaders?
        - Refine and reduce currently-available library
            - 2D projection matrix (partially complete)
            - 2D matrix(3) usage in general?
- ***Text***
    - *Rendering/logic*
        - Fix bugs surrounding rotation + alignment when used together
        - Redefine alignment - doesn't make much sense at the moment
        - Allow wrapping within a given space (likely a follow-on from UI)
        - Allow for colour sequencing per character per String?
        - Allow somehow for scrolling/animated/moving text
    - *Font*
        - Support for swapping the font
            - By current workings; would require an override texture in application as well as config of the character set in the app.js
- ***Game***
    - ~~Will be updated to adapt to State changes and the component based Entity system (all as knock-ons)~~
    - Support for click and scroll type input events
- ***Audio***
    - Allow for muting
    - Potentially (if necessary) switch to using something more advanced than the JS Audio object; giving rise to:
        - Volume control
        - Pausing/stopping/looping/positioning sounds
- ***Entity***
    - ~~Switch to a component based Entity system rather than a messy inheritance structure~~
    - Systems
        - Physics2D
            - Handle acceleration (to start)
        - AABBCollisionSystem
            - Integrate into the physics system? Seems to make sense...
        - PlayerControlled
            - Do *not* understand any of the input system examples I've come across, but this should "do something"
    - Components
        - Transform2D
            - Handle acceleration (to start)
                - Does this belong in a new component of some kind?
        - Sprite
            - need to change to somehow allow the user to say "texture slot 1/2/etc" rather than explicitly giving texture coordinates
        - PlayerControlled
            - Do *not* understand any of the input system examples I've come across, but this should "do something"
- ***(new) Shapes/Geometry***
    - Define geometry for various useful shapes both 2D and 3D
    - For use in creating UI elements as well as in defining Entity geometry
- ***(new) UI***
    - Flexible system allowing for panels, buttons, text boxes, etc
    - Basic layout systems built in? (grid/columns/etc?)
- ***Utilities***
    - *States*
        - ~~Adapt to include init and exit data/functions?~~
            - ~~Could end up better representing an entire game state; the data it operates on, how it transitions and behaves, etc~~
        - States now have an init function but I don't necessarily like this. Re-think and change if necessary
    - *Math*
        - Quite well fleshed out for now, but will likely require some additions and changes going forward
            - EG: Vec4 for alpha chanel colours?




----
----

# Setup
- Install project dependencies [Grunt](http://gruntjs.com/) and [Node (with npm)](https://nodejs.org) if necessary
- Clone the repository
- CD into the root directory
- run ***npm install***
- run ***grunt dev*** to develop or ***grunt dist*** to optimise (details below)

----
----

#Usage (grunt dev)
- Modify/add game files in the **src** directory
- Modify/add "engine"/boilerplate files in the **lib/protoGL-base** directory
- Add new third party libraries to the **lib/** directory
- Changes are reloaded automatically in your browser window
- in-place demo application provides example for replacement/expansion
- *documentation on protoGL-base capabilities coming soon*
- The **dist** directory always contains the running build of the game;
    - overwrite it with a ***grunt dist*** to temporarily test the distribution build in your browser before making further changes to the application

----
----

# Grunt Commands
### *grunt dev*
#### For smoother development
- Build the game to the **dist** directory without minimising the JS for debugging
- Open an HTTP server and browser window at the **dist** directory
- Watch the **src** and **lib** directories for changes

#####NOTES:
- requires ports *35729* and *8080* be open
- requires the following script to be present in the game's main HTML page (eg. src/app.html):
    - ***script src="http://localhost:35729/livereload.js"/>***

----

### *grunt dist*
#### For creating an optimised distribution build
- Build the distributable to the **dist** directory, with minimised JS

----
----
