# Use Node.js image for building the Vue app
FROM node:18 AS build-stage

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Vue app
RUN npm run build

# Use Nginx for serving the static files
FROM nginx:alpine

# Copy built files to Nginx HTML directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
