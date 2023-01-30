FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000:5000
RUN chown -R node /app
USER node
CMD ["npm", "start"]