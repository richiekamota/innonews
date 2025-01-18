# Use a Node.js base image
FROM node:18 AS frontend

# Set the working directory for your application
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your frontend application files
COPY . .

# Expose the port for the Vite development server
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
