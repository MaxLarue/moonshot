#!/bin/bash

set -e

SOURCE=$1
DEST=$2

gimp -idf --batch-interpreter=python-fu-eval -b - << EOF
import os
import glob
import gimpfu

def convert(filename, target):
    img = pdb.gimp_file_load(filename, filename, run_mode=gimpfu.RUN_NONINTERACTIVE)
    new_name =os.path.basename(filename).rsplit(".",1)[0] + ".png"
    layer = pdb.gimp_image_merge_visible_layers(img, gimpfu.CLIP_TO_IMAGE)

    pdb.gimp_file_save(img, layer, os.path.join(target, new_name), new_name)
    pdb.gimp_image_delete(img)

def convert_all(source_dir, target_dir):
    print "scanning: " + source_dir
    filenames = os.listdir(source_dir)
    filepaths = [os.path.join(source_dir,f) for f in filenames if f.endswith(".xcf")]
    print "Found " + str(len(filepaths)) + " files"
    for filename in filepaths:
        convert(filename, target_dir)
        print "converted: " + filename
try:
  convert_all('$SOURCE', '$DEST')
finally:
  pdb.gimp_quit(1)
EOF


