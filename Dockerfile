# Use an official Node runtime as a parent image
FROM node

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Serve the app using a simple static server
RUN npm install -g serve

CMD [ "serve","-s", "build" ]

# Expose the port the app runs on
EXPOSE 3000