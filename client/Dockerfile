FROM node:18-alpine as base
WORKDIR /client
COPY package*.json ./
EXPOSE 3000

FROM base as builder
WORKDIR /client
COPY . .
RUN npm run build

FROM base as production
WORKDIR /client
ENV NODE_ENV=production
RUN npm ci


COPY --from=builder /client/.next ./.next
COPY --from=builder /client/node_modules ./node_modules
COPY --from=builder /client/package.json ./package.json
COPY --from=builder /client/public ./public

CMD npm start

# FROM base as dev
# ENV NODE_ENV=development
# RUN npm install
# COPY . .
# CMD npm run dev
