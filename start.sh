set -o allexport
source .env
set +o allexport

docker run --rm -d -p $SERVER_PORT:$SERVER_PORT react_tetris