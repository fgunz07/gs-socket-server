FROM node:latest as build

WORKDIR /var/www

COPY . /var/www

RUN npm install
RUN npm run build

FROM node:19-alpine3.16

WORKDIR /var/www

COPY --from=build /var/www/build .
COPY --from=build /var/www/package.json .
COPY --from=build /var/www/package-lock.json .

RUN npm install --production

EXPOSE ${NODE_PORT}

CMD [ "node", "./bin/www.js" ]
