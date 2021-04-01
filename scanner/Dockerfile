FROM node:14.16.0-alpine3.10

COPY . /app
WORKDIR  /app

RUN npm i && npm run build

CMD ["npm", "start"]

