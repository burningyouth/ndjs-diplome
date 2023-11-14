FROM node:20.9-alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
RUN yarn add --force bcrypt

COPY . .