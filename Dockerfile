FROM mhart/alpine-node:14
WORKDIR /api
COPY package.json ./
RUN yarn
COPY . .

EXPOSE 9000
CMD [ "node", "server.js" ]
