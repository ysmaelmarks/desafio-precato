FROM node:16.10.0
WORKDIR /desafio-precato
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]