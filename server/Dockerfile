# Base stage for shared configuration
FROM node:18-alpine as base
WORKDIR /server
COPY package*.json ./
RUN npm install
EXPOSE 8080

# Builder stage for compiling/building the application
FROM base as builder
WORKDIR /server
COPY . .
RUN npm run build

# Production stage
FROM base as production
WORKDIR /server
ENV NODE_ENV=production
RUN ls /server
COPY --from=builder /server/dist ./dist
COPY --from=builder /server/node_modules ./node_modules
COPY --from=builder /server/package.json ./package.json
COPY --from=builder /server/.env ./
CMD npm start


# Development stage
FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD npm run dev