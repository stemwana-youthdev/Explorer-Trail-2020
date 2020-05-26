#!/usr/bin/env sh
set -e
set -x

envsubst < /var/www/src/env.js.template > /var/www/html/env.js

nginx -g 'daemon off;'
