# Node.js is a JavaScript-based platform for server-side and networking applications.
# https://hub.docker.com/_/node
FROM node:alpine

ARG APP_DIRECTORY=/home/user/app/frontend

WORKDIR $APP_DIRECTORY
ADD . $APP_DIRECTORY

# Download all the packages.
ADD ./package.json $APP_DIRECTORY
ADD ./yarn.lock $APP_DIRECTORY
RUN npm install express
RUN npm init -y

# Useful for making the http request.
RUN npm install axios

# UI.
RUN npm install react-scripts@3.4.1 -g 
RUN npm install @rpldy/uploady @rpldy/upload-drop-zone
RUN npm install styled-components