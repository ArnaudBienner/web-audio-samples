// Copyright (c) 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * A simple bypass node demo, which uses WebAssmebly code
 *
 * @class BypassProcessor
 * @extends AudioWorkletProcessor
 */
class BypassProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs, outputs) {
    // Process first channel only i.e. supports only mono for now
    let input = inputs[0][0];
    let output = outputs[0][0];

    // TODO: passing array to C is painful: factorize the code below as much as
    // possible
    // Get data byte size, allocate memory on Emscripten heap, and get pointer
    var nDataBytesInput = input.length * input.BYTES_PER_ELEMENT;
    var inputPtr = Module._malloc(nDataBytesInput);

    // Copy data to Emscripten heap (directly accessed from Module.HEAPU8)
    var inputHeap = new Uint8Array(Module.HEAPU8.buffer, inputPtr, nDataBytesInput);
    inputHeap.set(new Uint8Array(input.buffer));

    // Get data byte size, allocate memory on Emscripten heap, and get pointer
    var nDataBytesOuput = output.length * output.BYTES_PER_ELEMENT;
    var outputPtr = Module._malloc(nDataBytesOuput);

    // Copy data to Emscripten heap (directly accessed from Module.HEAPU8)
    var outputHeap = new Uint8Array(Module.HEAPU8.buffer, outputPtr, nDataBytesOuput);
    outputHeap.set(new Uint8Array(output.buffer));

    // Call function and get result
    Module.ccall('process_bypass', 'number', ['number', 'number', 'number'], [inputHeap.byteOffset, outputHeap.byteOffset, input.length]);
    var result_input = new Float32Array(inputHeap.buffer, inputHeap.byteOffset, input.length);
    var result_output = new Float32Array(outputHeap.buffer, outputHeap.byteOffset, output.length);
    output.set(result_output);

    return true;
  }
}

registerProcessor('bypass-processor', BypassProcessor);

