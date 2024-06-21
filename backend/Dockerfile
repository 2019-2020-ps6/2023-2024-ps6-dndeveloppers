FROM node:alpine3.20

RUN apk add --no-cache curl

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 9428

ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"e2e\" ]; then npm run start:e2e; else npm run start; fi"]