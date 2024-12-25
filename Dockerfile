FROM node:lts-buster

RUN apt-get update && \
    apt-get install -y \
    ffmpeg \
    imagemagick \
    ghostscript \
    libreoffice \
    libwebp-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /sophia

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
