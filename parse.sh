#!/bin/bash
while read name; do
    echo "Parsing: $name"
    node run.js "$name"
    echo ""
done
