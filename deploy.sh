#!/bin/bash

# build the site and put it online
# command:
#   npm run deploy

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac

if [unameOut = "Darwin"]
then 
    sed -e '10s#url: \".\"#url: \"https://avkudr.github.io\"#' -i '' _config.yml
fi

jekyll build
cd _site
git add -A
git commit -m 'rebuild pages' --allow-empty
git push origin master
cd ..

if [unameOut = "Darwin"]
then 
    sed -e '10s#url: \"https://avkudr.github.io\"#url: \".\"#' -i '' _config.yml
fi