FROM node

WORKDIR /app
COPY package*.json ./
COPY client/ ./client
COPY server/ ./server

RUN npm install

EXPOSE 3001
CMD [npm start]