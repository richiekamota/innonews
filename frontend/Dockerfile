# Use a node base image to build the frontend
FROM node:18 AS frontend

# Set the working directory for your application
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies from package.json, including Vite
RUN npm install

RUN npm i -g serve

# Copy the rest of your frontend application files
COPY . .

# Expose the port for the Vite development server
EXPOSE 5173

# Run npm install and start the dev server when the container starts
CMD ["sh", "-c", "npm install && npm run dev"]
