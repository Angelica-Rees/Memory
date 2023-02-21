FROM node:12.18.1
RUN npm install http-server -g
COPY . .
CMD [ "http-server"]
EXPOSE 8080