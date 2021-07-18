FROM node:16-alpine3.11

# Create app directory
WORKDIR /usr/app
# Install app dependencies
COPY package.json .
RUN npm install --quiet

COPY . .