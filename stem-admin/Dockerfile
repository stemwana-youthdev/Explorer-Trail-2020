FROM node:10 AS build-stage

ENV TERM=xterm
ENV ROOT /var/www/app

WORKDIR $ROOT

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build -- --prod

RUN gzip -k -r ./dist
RUN rm ./dist/stem-admin/env.js.gz

#------------------------------------------------------

FROM nginx:1.17-alpine as runtime-stage
ENV ROOT /var/www/app

RUN apk add --no-cache gettext

WORKDIR /var/www/html
COPY --from=build-stage $ROOT/dist/stem-admin .

WORKDIR /etc/nginx
COPY --from=build-stage $ROOT/nginx .

WORKDIR /var/www/src
COPY --from=build-stage $ROOT/env.js.template ./
COPY --from=build-stage $ROOT/run.sh ./
RUN chmod +x ./run.sh

# start sever
CMD ./run.sh
