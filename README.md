# Blockman Panic
## Ludum Dare 34
**Theme:** *Growing* and *Two Button Control*

Initially created for the Ludum Dare Compo; then improved slightly for the extended Jam.

Now serving as a workplace and test application for the formalisation of a WebGL engine I've been building for a while.

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