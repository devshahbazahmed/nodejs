# Base-image
FROM node:20.17.0-alpine3.19

# Copying the source code to docker image

COPY index.js /home/app/index.js
COPY package-lock.json /home/app/package-lock.json
COPY package.json /home/app/package.json

COPY Dockerfile Dockerfile

WORKDIR /home/app
RUN npm install

CMD ["npm", "start"]