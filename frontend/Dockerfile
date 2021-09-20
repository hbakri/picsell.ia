# Node.js is a JavaScript-based platform for server-side and networking applications.
# https://hub.docker.com/_/node
FROM node:alpine

ARG APP_DIRECTORY=/home/user/app/frontend

WORKDIR $APP_DIRECTORY
ADD . $APP_DIRECTORY

# Download all the packages.
ADD ./package.json $APP_DIRECTORY
ADD ./yarn.lock $APP_DIRECTORY
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent