FROM node:19-alpine

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
RUN yarn rebuild bcrypt

COPY . .

CMD ["yarn", "start:dev"]
