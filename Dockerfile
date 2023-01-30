FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /code
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000:5000
RUN chown -R node /code
USER node
CMD ["npm", "start"]