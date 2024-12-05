# Use Node.js LTS (Buster) as the base image
FROM node:lts-buster


RUN apt-get update && apt-get install -y ffmpeg

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if using yarn)
COPY package*.json ./

# Install dependencies (try npm first, fall back to yarn)
RUN npm install || yarn install

# Copy the rest of your app files to the container
COPY . .

# Change ownership of the application files to the 'node' user
RUN chown -R node:node /app

# Switch to the 'node' user for security reasons
USER node

# Expose the port (assuming the app runs on port 8000)
EXPOSE 8000

# Start the app using `npm start`
CMD ["node", "index.js"]