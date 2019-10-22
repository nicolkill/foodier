#!/bin/sh

set -e

if [ "$1" = 'start' ]; then
	if [ "$NODE_ENV" = "development" ]; then
		./node_modules/.bin/nodemon index.js
	else
		node index.js
	fi
fi

exec "$@"
