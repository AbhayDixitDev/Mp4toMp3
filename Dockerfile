# Base image with Node.js
FROM node:18-slim

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port (default Render uses 10000, 8080, etc. check your app)
EXPOSE 5000

# Start your app
CMD ["node", "index.js"]
