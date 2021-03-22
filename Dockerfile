# based on
# https://medium.com/bb-tutorials-and-thoughts/dockerizing-react-app-with-nodejs-backend-26352561b0b7

# set up the app
FROM node:15.12.0-buster AS ui-build
WORKDIR /usr/src/
COPY app ./app
RUN cd app && npm install && npm run build

# set up the server
FROM node:15.12.0-buster AS server-build
WORKDIR /root/
# copy the built react UI into the server
COPY --from=ui-build /usr/src/app/build ./app/build/
# copy the API config files into the server directory,
# and perform any necessary setup
COPY api/package*.json ./api/
RUN cd api && npm install
COPY api/server.js ./api/
RUN cd api && npm install
COPY api/server.js ./api/

EXPOSE 3080

CMD ["node", "./api/server.js"]