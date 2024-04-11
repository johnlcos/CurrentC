FROM node:18-alpine as base
WORKDIR /server
COPY package*.json ./
RUN npm install
EXPOSE 8080

FROM base as builder
WORKDIR /server
COPY . .
RUN npm run build

FROM base as production
WORKDIR /server
ENV NODE_ENV=production
RUN npm ci
RUN ls /server
COPY --from=builder /server/dist ./dist
COPY --from=builder /server/node_modules ./node_modules
COPY --from=builder /server/package.json ./package.json
COPY --from=builder /server/.env ./

CMD npm start