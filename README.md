## Description Here...
----
----

# Setup
- Clone the repository (switch to branch "new" for the moment)
- CD into the root directory
- run command ***npm install*** to download the necessary node_modules
- run either ***grunt dev*** or ***grunt dist*** (info below)

----
----

# Grunt Commands
### *grunt dev*
#### For smoother development
- Build the game without minimising the JS for debug purposes
- Open an HTTP server and browser window at the **dist** directory
- Watch the **src** and **lib** directories for changes.

Modify files in the game's **src** or **lib** directories to see changes automatically reloaded on the server and in your browser window.

##### NOTE: requires ports *35729* and *8080* be open
##### NOTE: requires the following script to be present in the game's main HTML page (eg. src/app.html):

###### ***script src="http://localhost:35729/livereload.js"/>***


----

### *grunt dist*
#### For creating an optimised distribution build
Build the game, minimising the JS

The **dist** directory now contains your optimised distributable game.

----
----

# TODO
### Boilerplate Refactors
- All code needs a look over; need to pick one consistent style and sweep
- Remove unneeded stuff
    - possible EG: levelmanager and levelpiece
        - useful conceptually but the same could be achieved with just a "workd" flag on ents
- Text needs a serious overhaul (incl. font texture + accuracy of u/v coords)
    - alignment, colours, size, orientation, maybe lower case?
- Entity structure needs overhaul
    - Follow style of the incremental renderer capabilities;
        - flexible extensible manager
        - flexible entities; switches for behaviour types and physics - set of defaults + extensible
            - components??????
    - Really don't like the getVerts() method of rendering
    - animation
- Renderer should use element arrays
    - will require changes to all which return data to the renderer
- Renderer needs splitting into 2D and 3D renderer?
    - Reasons
- CanvasRenderer as fallback/alternate?
- UI moduile
    - panels, etc