#!/bin/bash

sed -e '10s#url: \".\"#url: \"https://avkudr.github.io\"#' -i '' _config.yml
jekyll build
cd _site
git add -A
git commit -m 'rebuild pages' --allow-empty
git push origin master
cd ..
sed -e '10s#url: \"https://avkudr.github.io\"#url: \".\"#' -i '' _config.yml