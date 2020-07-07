FROM gmathieu/node-browsers:3.0.0 AS build

COPY package.json /usr/accplan/
WORKDIR /usr/accplan
RUN npm install

COPY ./ /usr/accplan
RUN npm run build

FROM nginx:1.15.8-alpine

## Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build  /usr/accplan/dist/ /usr/share/nginx/html

RUN echo "mainFileName=\"\$(ls /usr/share/nginx/html/main*.js)\" && \
          envsubst '\$API_URL \$UPLOAD_URL ' < \${mainFileName} > main.tmp && \
          mv main.tmp  \${mainFileName} && nginx -g 'daemon off;'" > run.sh

ENTRYPOINT ["sh", "run.sh"]