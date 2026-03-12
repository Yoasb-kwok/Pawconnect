#!/usr/bin/env bash
# Normalize nav icon PNGs to the same size so they scale consistently.
# Run from project root: ./scripts/normalize-nav-icons.sh
# Line thickness is determined by the original artwork; for uniform stroke
# weight, re-export all 5 icons with the same stroke (e.g. 2px) in Figma/Illustrator.

set -e
PUBLIC="public"
SIZE=128

for name in chat pet-match dog-walking shops media; do
  src="$PUBLIC/$name.png"
  if [ ! -f "$src" ]; then echo "Skip (missing): $src"; continue; fi
  tmp="$PUBLIC/${name}.tmp.png"
  sips -z $SIZE $SIZE "$src" --out "$tmp" && mv "$tmp" "$src"
  echo "Resized: $src -> ${SIZE}x${SIZE}"
done
echo "Done. All icons are ${SIZE}x${SIZE}."
