#!/bin/sh
set -eu
cd "$(dirname "$0")"
exec docker compose up --build "$@"
