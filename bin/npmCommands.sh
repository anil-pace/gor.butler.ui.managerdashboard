#!/bin/bash

for i in "$@"
do
echo "$i"	
case $i in
    -t|--target)

    TARGET="$2"
    shift
    ;;
    -m|--mock)
    MOCK="$3"
    shift
    ;;
    --default)
    DEFAULT=YES
    ;;
    *)
	
	#unknown option
	;;

    
esac
done
echo "IS MOck?? $MOCK"
if [[ "$TARGET" == "DEV" ]]; then
    if [[ "$MOCK" == "true" ]]; then
    	npm run build:dev:mock
    	exit 0
    else
    	npm run build:dev:unmock
    	exit 0
     
  fi
elif [[ "$TARGET" == "PROD" ]]; then
	if [[ "$MOCK" == "true" ]]; then
    	npm run build:prod:mock
    	exit 0
    else
    	npm run build:prod:unmock
    	exit 0
    fi
else
	echo "$TARGET"
	echo "ERROR: Running command"
	exit 1
  fi
 
