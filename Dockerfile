# Use node 9.10.0 LTS
FROM node:9.10.0

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install
RUN npm rebuild node-sass

# Expose API port to the outside
EXPOSE 80

# Launch application
CMD ["npm","start"]
