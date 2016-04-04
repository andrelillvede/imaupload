FROM node:5.0.0
ADD . /app
WORKDIR /app
RUN npm i
EXPOSE 3000
CMD node server.js
