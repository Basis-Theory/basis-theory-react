#!/bin/bash
set -e

current_directory="$PWD"

cd $(dirname $0)/..

yarn lint

echo "Running tests..."

# unit
yarn test --coverage

result=$?

cd "$current_directory"

exit $result
