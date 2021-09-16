# qol-tampermonkey
Quality-of-life Tampermonkey scripts that I hack together.

**NOTE!!!**: You *must* install [Tampermonkey](https://www.tampermonkey.net/) in your browser first.

## Bug Reports

Either email me at sahansk2+fixme@illinois.edu (please respect the plus addressing), make an issue on GitHub, or contact me on Discord.

## License

GPLv2. In a nutshell, you can fork/download/do what you want with the stuff I make here, but if you give the improved tampermonkey script to anybody you _must_ share the original source code (no minified garbage!)

<hr/>

## Slightly Better ECE391 Queue

### Description

A REALLY hacky TamperMonkey script that I might not ever maintain. Ever. 
In fact, the course staff might update the site and break this script unintentionally (or intentionally), but that's totally OK -- you use this at your own risk.

### Features

* Adds queue numbers to entries in the question queue
* Automatically updates numbers upon queue modifications
* Automatically scroll to your position if you are in the queue, and automatically scroll as your queue position changes **(non-Safari ONLY!!!)**
* Queue number highlighting based off of position (red if queue position < # TAs online, yellow if queue position < 2 * # TAs online, grey if otherwise)

### Installation

[Click Me](https://raw.githubusercontent.com/sahansk2/qol-tampermonkey/main/slightlybetterece391queue.js)

