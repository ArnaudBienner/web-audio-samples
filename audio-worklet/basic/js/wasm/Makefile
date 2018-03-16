
TARGET = bypass

all: $(TARGET).js


# Compile WASM in a module, and register the audio worklet processor within the post step
# See https://github.com/kripken/emscripten/issues/6230 for more details
%.js: %.c pre.js post.js
	emcc $(word 1,$^) --pre-js pre.js --post-js post.js -s SINGLE_FILE=1 -s WASM=1 -s BINARYEN_ASYNC_COMPILATION=0 -s ASSERTIONS=0 -s EXPORTED_FUNCTIONS="['_process_bypass']" -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall', 'cwrap']" -O0 -o $@

clean:
	rm -f $(TARGET).{js,wasm}
