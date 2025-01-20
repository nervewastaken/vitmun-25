FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGODB_URI=mongodb+srv://nerve:2382@delegateinfo.algz5.mongodb.net/?retryWrites=true&w=majority&appName=delegateinfo
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3VwZXItc3R1cmdlb24tMzEuY2xlcmsuYWNjb3VudHMuZGV2JA
ENV CLERK_SECRET_KEY=sk_test_DDAQKkklUQfb7ClL0Pq449T3nHHHMPCLgUKhKpFfNS

RUN npm run build

EXPOSE 4000

CMD ["npm","run", "start"]