FROM node:alpine3.20

RUN apk add --no-cache curl

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 9428

CMD ["npm", "run", "start", "dev"]
