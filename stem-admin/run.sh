#!/usr/bin/env sh
set -e
set -x

export DOLLAR='$'

envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
envsubst < /var/www/src/env.js.template > /var/www/html/env.js

nginx -g 'daemon off;'
