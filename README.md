#ProtoGL
A WebGL prototyping "engine" and game template - provides a sizeable, organised bed of boilerplate with a demo application serving as a template for any given project.
In active development. API, overall structure, engine capabilities and demo/template application are fluid.

##This Branch (Structural Changes)
The place to safely gut and replace the inheritance-based entity system in favour of a data-driven component-based one.
Also likely where a lot of main Game object changes and Renderer changes will take place, as well as the knock-ons for how the application itself must be written.

----

##Rough TODO
Not necessarily a complete list, definitely not in priority order 

###Pre-Ludum-Dare Prep (priority changes/upgrades)
- ***(new) UI***
    - At the moment, either relatively or absolutely positioned elements
    - Panels, text boxes, buttons will do as a starter for now
    - *maybe* some kind of layout system?
- ***Rendering***
    - *Renderer*
        - Stop assuming uniform types!
        - Improve 3D capabilities (partially done here, partially in the entity system)
    - *RenderSettings*
        - Add uniform type to uniform definition
    - *Shaders*
        - Refine and reduce currently-available library
            - 2D projection matrix (partially complete) + 2D matrix based transformations??
- ***Text***
    - *Rendering/logic*
        - (as part of UI) text wrapping in a given space
        - scrolling/animated/moving text?
        - color sequencing per character or per word?
- ***General***
    - Input system that handles the recording and management of all input events for polling elsewhere
        - Click and scroll type events are an important addition to this (useful for UI)
- ***Audio***
    - Allow for muting the game
- ***Entity***
    - Work on 3D equivalency for Transform2D and Physics2D?
        - Will likely necessitate the introduction of some kind of *geometry* generator, starting with cubes
    - (along with the input changes noted in this list) figure out how the PlayerControlled component is supposed to help/work
    - Allow for Sprite animation - multiple sprite panels defined per entity?
        - FIRST: change Sprite to requiring a "sprite slot" or similar rather than explicit u/v coordinates (look at how TextManager does its thing for help)
        - THEN: allow a Sprite component (or a new Animation component?) to contain a range of "sprite slots"
            - will likely require some kind of directive for when to change sprite slot and how and how quickly, etc
            - Not gonna be simple but it needs to be done - dirty will do for now

###Other (low priority/not immediately important)
- ***Text***
    - *Rendering/logic*
        - Fix bugs surrounding rotation + alignment when used together
        - Redefine alignment - doesn't make much sense at the moment
    - *Font*
        - Support for swapping the font
            - By current workings; would require an override texture in application as well as config of the character set in the app.js
- ***Audio***
    - Potentially (if necessary) switch to using something more advanced than the JS Audio object; giving rise to:
        - Volume control
        - Pausing/stopping/looping/positioning sounds
- ***Entity***
    - Systems
        - Physics2D
            - Handle acceleration (to start)
        - AABBCollisionSystem
            - Integrate into the physics system? Seems to make sense...
    - Components
        - Transform2D
            - Handle acceleration (to start)
                - Does this belong in a new component of some kind?
- ***(new) Shapes/Geometry***
    - Define geometry for various useful shapes both 2D and 3D
    - For use in creating UI elements as well as in defining Entity geometry

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
