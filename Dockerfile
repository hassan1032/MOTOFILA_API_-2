FROM node:lts-alpine
ENV NODE_ENV=production
ENV MONGO_URI=mongodb://localhost:27017/motofila
ENV PORT=8001
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8001
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
