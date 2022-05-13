# build
FROM node:18-alpine AS builder

WORKDIR /build

COPY package.json .
COPY prisma ./prisma/

RUN yarn 

COPY . .

RUN yarn build

FROM node:18-alpine as production

WORKDIR /app

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/prisma ./prisma

CMD [ "yarn", "start:prod" ]