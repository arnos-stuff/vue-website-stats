FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g serve
# make the 'app' folder the current working directory

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]