
TARGET = bypass

all: $(TARGET).js


# Compile WASM in a module, and register the audio worklet processor within the post step
# See https://github.com/kripken/emscripten/issues/6230 for more details
%.js: %.c
	emcc $^ --pre-js pre.js --post-js post.js -s SINGLE_FILE=1 -s WASM=1 -s BINARYEN_ASYNC_COMPILATION=0 -s ASSERTIONS=0 -s EXPORTED_FUNCTIONS="['_process_bypass']" -O0 -o $@

clean:
	rm $(TARGET).{js,wasm}
