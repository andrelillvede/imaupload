FROM node:5.0.0
ADD . /app
WORKDIR /app
RUN npm i
CMD node server.js
