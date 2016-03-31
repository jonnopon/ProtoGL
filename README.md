#ProtoGL
A WebGL prototyping "engine" and game template - provides a sizeable, organised bed of boilerplate with a demo application serving as a template for any given project.
In active development. API, overall structure, engine capabilities and demo/template application are fluid.

## This branch (Mini-LD-66)
Originally branched for the purposes of creating an RTS game for MiniLD66.
Immediately, I began tinkering with the engine itself, and after months of ignoring the project due to anxiety about the workload I began to figure out what was fundamentally "wrong" and where to go.
As such, this branch is now the home for necessary ProtoGL improvements - by the time I'm done, the engine will be as modular and extensible as I want it to be.
Past that point, adding capabilities to increase the potential of what an application can do will be as easy as I've always wanted.
I will be able to implement an idea, adding engine capabilities as necessary as I've always desired.
Making games might become *fun* again.

----

##TODO
The following list is diminishing - anything you see here has yet to be done. When an item is done, it spends one commit struck out, the next it is gone forever.
The list is fluid. As I tackle more and more, the requirements will change. The list will always represent the *current* next steps.

- **First Pass - basic/absolutely necessary improvements**
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
        - Lots to consider - I want to end up with a clean, extensible component based entity system
        - Animation
        - Improvements/configurability of EntityManager
                
    - **New** Shapes - CREATE IN (*lib/protogl-base/shapes*)????? Depends how I play the Entity resructure I guess
        - part of entity system? Is a shape inherently a game object? Or are they generic concepts used by any other system?
        - Simple representations of all kinds of basic shapes (squares, triangles, circles, cubes, spheres, you get the picture)
        - This will lead into helping conceptually replace the Entity system system AND feed directly into...
        
    - **New** UI - CREATE IN (*lib/protogl-base/ui*)
        - Panels, buttons, text boxes, all kinds of juicy lovelies that simply do not exist yet for some reason (laziness/"lack of need")
        
    - Game (main object) (*lib/protogl-base/Game.js*)
        - Key detection system is a little off; likely will need replacing with an **input module** anyway
        
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
                - Kind of already exists in a weak partial form in (*lib/protogl-base/utils/Utils.js*)
        - States (*lib/protogl-base/State.js*)
            - Probably fine as-is, though...
                - Initialisation data per-state? (will naturally alter the Game object appropriately if done)
                - Initialisation and exit function to set and destroy that data on the game object? (as above)
                - Would allow a State to FULLY represent a state; what the app does when switching to and from the state, what the app does in the state, the data it operates on
        - KeyCodes (*lib/protogl-base/KeyCodes.js*)
            - See TODO in the file
        
- **Second Pass/Optional Improvements/Future (brain dump)**
    - Text (*lib/protogl-base/text*)
        - Fix minor bugs surrounding rotation + alignment when used together
        - Allow wrapping - that is, providing a chunk of text and having it fill some container nicely
            - potentially dependant on the shapes module
        - Allow for individual character colouring
        - Allow for scrolling text (Pokemon style, not literally scrolling)
        - Allow for moving text (translation)
        - Support for swapping the font?
            - Allow replacement of font texture with an overriding font in the application
            - If overriding the font, the application must configure the character set the TextManager knows about before it is initialised. The rest would "just work"

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
