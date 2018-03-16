#include <stdio.h>


// input and output should have the same size, defined in size
void process_bypass(float* input, float* output, int size)
{
  for (int i = 0; i < size; ++i) {
    output[i] = input[i];
  }
}
