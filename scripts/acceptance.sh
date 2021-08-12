#!/bin/bash
set -e

current_directory="$PWD"

cd $(dirname $0)/..

echo "Running tests..."

# unit
yarn test --coverage
# e2e TODO
# yarn test:e2e

result=$?

cd "$current_directory"

exit $result
