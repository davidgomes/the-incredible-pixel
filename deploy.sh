# Deploys The Incredible Pixel to Google App Engine's AppSpot

echo "var url = \"http://www.the-incredible-pixel.appspot.com\";" > src/URL.js
mkdir static/
cp -r ./* static/
rm -rf static/static/
~/Downloads/google_appengine/appcfg.py --email davidrafagomes@gmail.com update ./
echo "var url = \"http://localhost:8000\";" > src/URL.js
rm -rf static/
