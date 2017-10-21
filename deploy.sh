cd `dirname $0`

git pull
docker build -t universehan/campuscanvas .
docker stop canvas-server
docker rm canvas-server
docker run -d --name canvas-server -p 10003:9892 universehan/campuscanvas
