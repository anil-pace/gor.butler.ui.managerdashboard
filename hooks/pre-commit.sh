#!/bin/zsh
#currently running Eslint on all files irrespective of 
#whether changes are made or not
#Later on we will run it in the modified files only
function lintit () {
  #OUTPUT=$(git diff HEAD --name-only | grep -E '(.js)$')
  #a=("${(f)OUTPUT}")
  #if [[ "$a" != "" ]];then
  e=$(node_modules/.bin/eslint ./src/** -c .eslintrc.json)
  echo "$e"
  if [[ "$e" != *"0 problems"* && "$e" != "" ]]; then
    echo "ERROR: Check eslint hints."
    exit 1 # reject
  else
    runtests
  fi
#else
	#echo "No JS file modified"
	#runtests
#fi
}

function runtests(){
  npm run test
  rc=$?
  if [[ $rc != 0 ]] ; then
            # A non-zero return code means an error occurred, so tell the user and exit
            echo "Test cases Failed"
            exit $rc
        fi
  
  exit 0
}

lintit
