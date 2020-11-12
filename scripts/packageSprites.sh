#!/bin/bash

set -e

INPUT_DIR=$1
OUTPUT_FILE=$2
OUTPUT_FILE_META=$3

node ./node_modules/spritesheet-assembler/index.js \
  -i $INPUT_DIR \
  -o $OUTPUT_FILE \
  -d $OUTPUT_FILE_META
