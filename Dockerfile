   
FROM node:18-alpine AS builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install --silent
COPY . .
# CMD ["npm", "run", "dev"]
# EXPOSE 5173
CMD ["npm", "run", "dev"]
