#REFACTOR/RESTRUCTURE TODO/SANITY CHECK
This whole project is a travesty. This'd be because I just slammed it together over a few disparate projects and didn't plan for anything to take any real kind of shape.
As such, a hell of a lot of things need to change before I can even think of adding capabilities and pushing the project forward.
I'm probably over-exaggerating, but I have *no idea* how the current state of the project has allowed me to create 4 games in wildly different genres.
I may, or may not, be a psychopath who is most comfortable with crappy code and even worse framework structure.
So, without further ado: TODO/SANITY CHECK...
----
- ALL EXISTING CODE needs a go-over to pick a single consistent style and sweep it throughout BEFORE THE FOLLOWING
    - And omg pick a file-naming convention. Do I have an upper-case or a lower-case to start? Camel case or dashes or underscores? fix it pls
- FUNCTIONAL MODULES:
    - Rendering (*lib/protogl-base/screen*)
        - Renderer
            - Further flexibility
                - EG: uniform type is still assumed in-renderer
            - Split into 2D and 3D renderers?
                - Rather than just having 3D be a capability, it should be an entirely separate class of capabilities
                - This would easier separate the 2D and 3D portions of a given game project AND might help with the Entity and Shape system later on
            - *Element Arrays Damn it* - all kinds of optimisations can be made alongside this
            - CanvasRenderer as fallback?
                - There are reasons for and against this of course, the major FOR being *fallbacks are good* and the major AGAINST being *Have to double my work to reliably add capabilities*
                - To be fair, not even sure if a CanvasRenderer fallback would *work* for representing all the things I wish to represent...
        - Shaders
            - I actually really like how I've done this. Built-in defaults for both frag and vert, with ability to store new ones at runtime for retrieval and use later on
            - Allows for future expansion (create one for an app that is generally useful? Copy into the back-end for permanent storage)
            - Allows for per-app runtime expansion.
            - Nice! (I think)
        - RendererSettings
            - At the moment, this object is designed to represent settings to configure the renderer PER "type" of drawn object (text, entitites, level stuff, etc)
            - This kind of works well, and I think it's sane. It is also extensible if I find any other use for it (EG those assumed Uniform types?)
            - Will likely leave as-is, I...think. To be fair, these are only used internally by the Managers and even in the case where I'd maybe change how this works because suddenly the Managers are configurable, the Managers can make the changes on the fly...
            - I don't think I'd ever want a completely different set of rendering for objects of the same type?
                - EG: EntityManager manages all in-game objects. Presumably, they're all either going to be 2D or 3D but not a mix of both. Presumably, they're all going to either have a texture or not have a texture
                    - These might be super dumb assumptions to make. The only way to fix these assumptions would be to split render calls for objects of different types THEN for objects within those types that have different settings. Hmmmmmmm.....
            
    - Entity (game object representation) (*lib/protogl-base/ent*)
        - OH BOY THIS IS A MESS
        - Will detail wtf to do here later, it's too much to think about in one sitting...
        
        - *From old TODO, potentially useful as a thought-proker when I come to re-design this module*
             ~~- Follow style of the incremental renderer capabilities;~~
                    ~~- flexible extensible manager~~
                    ~~- flexible entities; switches for behavior types and physics - set of defaults + extensible~~
                        ~~- components??????~~
                ~~- Really don't like the getVerts() method of rendering~~
                ~~- animation~~
   
    - Level (*lib/protogl-base/lvl*)
        - WHY DOES THIS EXIST? SERIOUSLY REDUNDANT
        - Either remove or think of a reason for it to exist alongside significant differences from the Entity system that justify its separate existence
        
    - Game (main object) (*lib/protogl-base/Game.js)
        - Needs to be able to change the width and height of...well, the game
            - Right now this is actually done in Renderer's initialisation; it gets the canvas, sets its width and height and uses that canvas to get and alter the gl context
            - **New Logic:** *Game* gets Canvas and sets its width and height, passes that onto the Renderer which gets and alters the gl context
        - Need to figure out what this trickery with setting a window property "game" actually does/if it's necessary - understand WHY in either case
        - Need a simple function to check "is a key pressed?" to remove the need to do stupid long-winded indexOf's in the application
        - Why is the "run" function set as a named array property rather in the normal fashion? Understand WHY and change if necessary/possible
        - setSoundManager and setEntityManager are set in a different way as well...like, statically I guess?
        - addAttr and addMethod do the same thing exactly - come up with a good common name and remove one
        
    - **New** Shapes - CREATE IN (*lib/protogl-base/shapes*)????? Depends how I play the Entity resructure I guess
        - part of entity system? Is a shape inherently a game object? Or are they generic concepts used by any other system?
        - Simple representations of all kinds of basic shapes (squares, triangles, circles, cubes, spheres, you get the picture)
        - This will lead into helping conceptually replace the Entity system system AND feed directly into...
    - **New** UI - CREATE IN (*lib/protogl-base/ui*)
        - Panels, buttons, text boxes, all kinds of juicy lovelies that simply do not exist yet for some reason (laziness/"lack of need")
    - Text (*lib/protogl-base/utils/textUtils.js*) - MOVE TO -> (*lib/protogl-base/text*)
        - Needs to be flexible and configurable, as with the current renderer
        - Needs to allow for:
            - alignment
            - colouring
            - sizing
            - orientation
        - font image itself needs updating to make it less absolutely crappy
            - U/V texture coordinates in the textUtils module need refining to be more accurate and predictable
            - font image should somehow allow for lower-case text; two images? Two alphabetic character sets?
        - Support for swapping the font?
            - This would likely be a complete refactor, maybe even deprecate the entire functionality...
            - EG: support TTF? Goodbye PNG-based font images and the need for all that complex logic (probably?)
            - Could always make a *slight* change and allow replacement of font texture with an overriding font in the application
                - Would require that the application configure the character set the textUtils class uses of course
    - Audio (*lib/protogl-base/audio*)
        - Y'know what, this is actually alright - because it is comprised of 11 lines of code, that is (insert leftpad joke here)
        - Could probably do with some new capabilities:
            - pausing sounds?
            - stopping sounds
            - volume control?
            - muting entire system
        - May require something more advanced than the browser's Audio object, need to look into this more seriously
    - Utilities (globally available to applications)
        - **New** Math - CREATE IN (*lib/protogl-base/math*)
            - (custom) Matrix math is a MUST; replace gl-matrix; it doesn't fit my code style or object representation preferences, and I know the math. Why am I using it at all!?
            - Along the same lines; vector math needs a redo
                - Kind of already exists in a weak partial form in (*lib/protogl-base/utils/utils.js*)
        - States (*lib/protogl-base/State.js*)
            - Probably fine as-is, though...
                - Initialisation data per-state? (will naturally alter the Game object appropriately if done)
                - Initialisation and exit function to set and destroy that data on the game object? (as above)
                - Would allow a State to FULLY represent a state; what the app does when switching to and from the state, what the app does in the state, the data it operates on
        - KeyCodes (*lib/protogl-base/KeyCodes.js*)
            - Probably fine as-is, though...
                - Need a simple function that checks "is a keycode pressed?") - at the moment the application must do a stupid indexOf thing
                - Naturally this function fits better in the Game object, but noting it here because *reasons*

----
----
##old/useful info
RTS game made for MiniLD 66 - "You Must Create Additional RTS Games"
Built on top of the ProtoGL base project to allow simplistic back-porting of any engine improvements made.
Having to do this has made me realise what is "wrong" with this project. Must eventually change to fit.

A WebGL prototyping "engine" - provides a sizeable, organised bed of boilerplate on which a game can be built.
**Currently just an amalgamation of a lot of compunding work done to produce small prototypes for Ludum Dare competitions; in no way clean, finished, fully functional or user-friendly. In "active" (occasional) development.**

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
