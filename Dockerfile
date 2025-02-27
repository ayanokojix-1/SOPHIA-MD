FROM node:lts-buster

RUN apt-get update && \
    apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/A-Y-A-N-O-K-O-J-I/SOPHIA-MD /sophia
RUN chown -R node:node /sophia
USER node
WORKDIR /sophia
RUN npm install
CMD ["sh", "-c", "npm start"]

