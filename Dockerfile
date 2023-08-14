FROM node:16.16

WORKDIR /frontend

COPY package.json /frontend
COPY . .

RUN npm install

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]
