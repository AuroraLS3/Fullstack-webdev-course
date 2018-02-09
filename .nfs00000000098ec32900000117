#!/bin/sh
npm run build
cp -r build ../temp
git reset --hard
git checkout heroku-part3-backend
cp -r ../temp build
rm -r ../temp
git add -A
git commit -m "Updated frontend"
git push
git checkout heroku-part3-frontend
