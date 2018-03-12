
TARGET = bypass

all: $(TARGET).js

%.js: %.c
	#emcc $^ -o $@ -s WASM=1 #-s EXPORT_NAME="'AudioWorkletGlobalScope.WAM'"
	emcc $^ --pre-js pre.js --post-js post.js -s SINGLE_FILE=1 -s WASM=1 -s BINARYEN_ASYNC_COMPILATION=0 -s ASSERTIONS=0 -s EXPORTED_FUNCTIONS="['_process_bypass']" -O0 -o $@

clean:
	rm $(TARGET).{js,wasm}
