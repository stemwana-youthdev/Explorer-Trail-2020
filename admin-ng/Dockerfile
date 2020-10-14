FROM node:14.5.0 AS build-env

ENV TERM=xterm
ENV ROOT /var/www/app

COPY . $ROOT    

WORKDIR $ROOT
RUN npm install --loglevel=warn && export PATH=$PATH:./node_modules/@angular/cli/bin && chmod +x ./node_modules/@angular/cli/bin/ng && npm run build

#------------------------------------------------------

FROM nginx:1.19-alpine-perl
ENV ROOT /var/www/app

WORKDIR /var/www/build
COPY --from=build-env $ROOT/dist $ROOT
COPY --from=build-env $ROOT/nginx.conf /etc/nginx/conf.d/default.conf