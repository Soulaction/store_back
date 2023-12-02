FROM node:20-alpine

WORKDIR /app
COPY . .
EXPOSE 8080

CMD ['nodemon', 'index.js']
