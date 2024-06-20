FROM node:alpine3.20

WORKDIR /app

COPY package.json ./package-lock.json ./

RUN npm install 

COPY ./ /app

EXPOSE 9428

CMD ["npm", "run","start", "dev"]
