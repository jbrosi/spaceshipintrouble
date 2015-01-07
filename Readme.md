# Spaceship in Trouble

A small WebGL game written in TypeScript, ThreeJS and some other libraries.
It was written in order to demonstrate the power of WebGL games as they are easy to write,
cross plattform and the performance isn't too bad

## May I see it in action?

Yes you may! Checkout the latest [stable version](http://jbrosi.github.io/spaceshipintrouble/demo/) or just clone the
project and build it on your own. If you're interested in the code you'll get the latest commits here in this github repo.
You may also browse through the [Cloud9 Code Repo](https://c9.io/jbrosi/spaceshipintrouble) (could be a few commits outdated)
or watch the [apidocs](http://jbrosi.github.io/spaceshipintrouble/api).

## What if something doesn't work?

The status of this is pre-alpha yet and there may be several bugs but feel free
to open an issue if you want something to be fixed.

## Typescript? Why?

In order to see if it's worth the effort. This is my first larger TypeScript project but I'm already loving it. It
produces almost exactly the code I would write when using plain JavaScript but helps my IDE with AutoCompletion, Typechecks
and so on. It just adds some convenience stuff to my beloved JavaScript while not affecting its performance or possibilities,
so why not use it?

If you don't like it but want to use parts of my Code just compile it to JavaScript and work with the compiled result.

## Did you do this all on your own?

Of course not. I used various libraries, tools and assets... The entity / component system is heavily inspired by the
[TTJS Engine](https://github.com/CSchnackenberg/TTjs), a port of the famous TouchThing Engine which
[Christoph Schnackenberg](https://github.com/CSchnackenberg) and I created a few years ago.

### Libraries

- ThreeJS
- Lodash
- Stats
- Box2DWeb


### Tools

- Typescript
- Wings3D
- Gimp
- Blender
- Cloud9
- PHPStorm

### Assets

- Some models from opengameart.org (cco)
- One or more textures on this project have been created with images from Goodtextures.com. These images may not be redistributed by default. Please visit www.goodtextures.com for more information.


## Sounds awesome, may I join?

Sure! Just fork the project, play around with it, create issues for new features and drop me a message if you really
want to add some code or assets.


## Some parts look more like an engine than an actual game, do they?

You got sharp eyes over there. Yep, they do! I plan on separating engine and game later on and use the game
just as an example for how to use the engine. But as of this very early state of the project it's muuuch easier
to have both projects combined in one as there will be lots of api changes.

As soon as the project reaches a more stable status and the api becomes to be more stable, too I'll separate those
two projects. Though both projects will remain under the MIT License. Promise.


## Why aren't you using Unity3D or Unreal Engine?

I played around with both and yes, they're awesome (see http://blog.jbrosi.de for my experiments). You can focus on
the game and don't  have to mess around with stuff like how to render graphics, how to handle input and how to display
HUD-Stuff. Also both support (as with unity 5 and ue4) WebGL builds which may run in plain js/html5 within your favorite
browser or native builds for more speed on your favorite mobile.

Though as the title of this repo says this is not only about the game! It's more about to show what's possible with html5 on its own.
The game engines use tools like emscripten to convert c++ to javascript / asm.js.

I am not trying to compete with the professional game engines but want to show the power of modern webapps. See this
as a proof of concept.


## That's quite cool, may I use it?

The project is released under the the MIT License (MIT) so you should be able
to use it for almost everything you need. Be careful when using the libraries and
assets as they may fall under other licenses.


The MIT License (MIT)

Copyright (c) 2014 Johannes Brosi <me@brosi.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
