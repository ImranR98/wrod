#!/bin/bash

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

if [ -n "$ANALYTICS_SCRIPT_ELEMENT" ]; then
    sed -i "s/<!-- ANALYTICS_SCRIPT_PLACEHOLDER -->/${ANALYTICS_SCRIPT_ELEMENT//\//\\/}/" "$SCRIPT_DIR"/index.html
fi