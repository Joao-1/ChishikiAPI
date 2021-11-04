FROM node

WORKDIR /usr/chishikiApi
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000

CMD [ "yarn", "start" ]