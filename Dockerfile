FROM node:10.16.0-alpine
WORKDIR /app
COPY server/ /app/
RUN npm install
EXPOSE 9710
CMD ["npm", "start"]
