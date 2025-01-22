FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGODB_URI=mongodb://mongo:27017/delegateinfo
ENV ADMIN_USERNAME=krish
ENV ADMIN_PASSWORD=1234


RUN npm run build

EXPOSE 4000

CMD ["npm","run", "start"]