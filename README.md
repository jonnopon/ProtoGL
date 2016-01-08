## Description Here...
----
----

# Setup
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
    - *overwrite it with a ***grunt-dist*** to temporarily test the distribution build in your browser before making further changes to the application*

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

# TODO
### ProtoGL-Base Refactors
- All code needs a look over; need to pick one consistent style and sweep
- Remove unneeded stuff
    - possible EG: levelmanager and levelpiece
        - useful conceptually but the same could be achieved with just a "world" flag on ents
- Initial protoGL-base Documentation
- Text needs a serious overhaul (incl. font texture + accuracy of u/v coordinates)
    - alignment, colours, size, orientation, maybe lower case?
- Entity structure needs overhaul
    - Follow style of the incremental renderer capabilities;
        - flexible extensible manager
        - flexible entities; switches for behavior types and physics - set of defaults + extensible
            - components??????
    - Really don't like the getVerts() method of rendering
    - animation
- Renderer should use element arrays
    - will require changes to all which return data to the renderer
- Renderer needs splitting into 2D and 3D renderer?
    - Reasons
- CanvasRenderer as fallback/alternate?
- UI module
    - panels, etc

----
----