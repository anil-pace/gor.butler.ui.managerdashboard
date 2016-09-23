#!/bin/zsh

function lintit () {
  OUTPUT=$(git diff HEAD --name-only | grep -E '(.js)$')
  a=("${(f)OUTPUT}")
  e=$(node_modules/.bin/eslint $a)
  echo $e
  if [[ "$e" != *"0 problems"* ]]; then
    echo "ERROR: Check eslint hints."
    exit 1 # reject
  fi
}
lintit