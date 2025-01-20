FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGODB_URI=mongodb://mongo:27017/delegateinfo
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_Y2xlcmsudml0LmFjLmluJA
ENV CLERK_SECRET_KEY=sk_live_XQlGPjJaVstfzFprySN4EepWRYcZ68wrNkhmPDxDWZ

RUN npm run build

EXPOSE 4000

CMD ["npm","run", "start"]