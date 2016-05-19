#ProtoGL
A WebGL prototyping "engine" and game template - provides a sizeable, organised bed of boilerplate with a demo application serving as a template for any given project.
In active development. API, overall structure, engine capabilities and demo/template application are fluid.

----

##This Branch (sharpshifter-dev)
Improving the game I made for Ludum Dare 35, to further its benefit as a demonstration app for the engine as well as improve the engine's 2D capabilities.
Main focus: increasing "game feel" and adding helpers/components/utilities to ProtoGL to help reproduce this in the future.

----

##Rough (engine) TODO
Not necessarily a complete list, definitely not in priority order
- ***(new) UI***
    - buttons + textboxes (+ wrapping for Text)
    - Textured components
    - events for components
- ***Rendering***
    - *Renderer*
        - ~~stop assuming uniform types~~
        - Improve/split out 3D capabilities
        - Matrices need to become more prevalent
    - *Shaders*
        - 2D projection matrix
        - fully matrix based transformations? (knock ons for entities)
        - 3D...everything
- ***Text***
    - text wrapping
    - Fix bugs surrounding rotation + alignment when used together
    - Redefine alignment - doesn't make much sense at the moment
    - scrolling/animated/moving text?
        - break the current representation of string to a list of character descriptors, lots becomes possible (color sequencing)
    - Support for swapping the font
        - By current workings; would require an override texture in application as well as config of the character set in the OLD.js
- ***Audio***
    - allow for muting the game
    - Switch to OpenAL if possible, else find a way to achieve volume control and pausing/stopping/looping sounds, maybe positioning
- ***Entity***
    - 3D basic components
    - figure out if you want to adapt the input system to utilise a PlayerControlled component
    - Do some more physics-ey stuff
    - ~~Upgrade the manager to group entities better and correctly configure renderSettings for as few render calls as is necessary~~
    - *Sprite component*
        - change representation of sprites on an atlas to be indices so u/v coordinates can be calculated rather than provided
            - new assumption: spritesheets are a 1D row of same-size sprites - count indices from the left. Easy to fix if desired
    - *New Animation Component*
        - represented as alist of sprite indices (counting from left in a 1D sheet of same-size sprites) and calculated u/v coordinates
            - EG: new Animation("walking", 15, 25) if the animation is in sprites 15 to 25 (inclusive?)
        - "active" flag
        - Entities should add an Animation component for every different animation
        - Add an AnimationSystem
            - Entities can register an "onAnimate" function that's called for every entity with an Animation system
                - Can use this function to define animation behavior; "if walking use walking animation, if still use idle animation"
- New shapes utility
    - ~~Gets the vertex lists required to build basic 2D and 3D shapes based on input data~~
        - ~~EG: *_setGeometry("square", extraAttributesPerVertex);* or *_setGeometry("cube", extraAttributesPerVertex);*~~
        - ~~Use this in EntityManager as part of the rendering preparation~~
        - ~~send a list of attribute objects; a list of attributes to repeated after the position attributes in the returned list~~
              

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
