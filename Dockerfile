FROM node:lts-buster

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /sophia

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
