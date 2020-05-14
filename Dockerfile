FROM node:10 AS build-stage

ENV TERM=xterm
ENV ROOT /var/www/app
ENV APP_NAME stemwana-youthdev

WORKDIR $ROOT

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build:prod

RUN gzip -k -r ./dist
RUN rm ./dist/${APP_NAME}/env.js.gz

#------------------------------------------------------

FROM nginx:1.17-alpine as runtime-stage

ENV ROOT /var/www/app
ENV APP_NAME stemwana-youthdev

RUN apk add --no-cache gettext

WORKDIR /var/www/html
COPY --from=build-stage $ROOT/dist/${APP_NAME} .

WORKDIR /etc/nginx
COPY --from=build-stage $ROOT/nginx .

WORKDIR /var/www/src

# start sever
CMD ./run.sh
