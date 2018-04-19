#!/bin/bash
while read name; do
    echo "Parsing: $name"
    node run-new.js "$name"
    echo ""
done
