# Use the official Node.js image with Alpine Linux as the base image
FROM node:alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port on which the Next.js application will run
EXPOSE 3000

# Command to run the Next.js application
CMD ["npm", "run", "startDocker"]
