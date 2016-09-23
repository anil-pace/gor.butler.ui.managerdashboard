#!/bin/zsh

function lintit () {
  OUTPUT=$(git diff HEAD --name-only | grep -E '(.js)$')
  a=("${(f)OUTPUT}")
  if [[ "$a" != "" ]];then
  e=$(node_modules/.bin/eslint $a)
  echo $e
  if [[ "$e" != *"0 problems"* ]]; then
    echo "ERROR: Check eslint hints."
    exit 1 # reject
  fi
else
	echo "No JS file modified"
	exit 0
fi
}
lintit