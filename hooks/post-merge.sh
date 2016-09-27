#!/bin/zsh
#This git command is run to untrack the configConstants.js file
#This command has to be run after every pull to untrack this file hence 
#it is put in the post merge hook
git update-index --assume-unchanged src/constants/configConstants.js
echo "Post merge called"