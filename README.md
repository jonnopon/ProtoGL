# ProtoGL

A legacy/dead pure ES5-compliant JavaScript game prototyping engine designed for the swift implementation of browser games, created as a cumulative result of
years of biannual [LDJam](https://ldjam.com/) entries.

Project source, commit history and system stability are assumed to be generally terrible due to my experience at the time and a poor development approach. The
last earnest work (circa ~2014) left the project in a state of partial rewrite. There is no documentation or testing.

**[ProtoGL-TS](https://github.com/jonnopon/ProtoGL-TS)** is an attempt at reapproaching this project and its concepts from the ground up.


## Setup

- Install [Grunt](http://gruntjs.com/) and [Node (with npm)](https://nodejs.org)
- Clone
- Terminal: `npm install`


## Develop

- Terminal: `grunt dev`
- Work on demo/game in `src/`
- Work on engine in `protogl-base/`
- View output at `localhost:8080`


## Distribute

- Terminal: `grunt dist`
- Retrieve build from `dist/`