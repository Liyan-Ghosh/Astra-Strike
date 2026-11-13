#!/bin/bash
# needs Emscripten (emsdk). Run from this folder.
em++ -c main.cpp -o main.o -Istubs -include shim.h -O2 -std=gnu++17 -w
em++ -c shim.cpp -o shim.o -Istubs -include shim.h -O2 -std=gnu++17 -w
em++ main.o shim.o -o ../game.js -O2 -sLEGACY_GL_EMULATION=1 -sALLOW_MEMORY_GROWTH=1 --js-library lib.js --pre-js pre.js
