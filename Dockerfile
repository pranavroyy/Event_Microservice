# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder
ARG SERVICE
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx nest build ${SERVICE}

FROM node:20-alpine AS runner
ARG SERVICE
ENV SERVICE=${SERVICE}
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

# nest build with a monorepo outputs to dist/apps/<service>/main.js
CMD node dist/apps/${SERVICE}/main.js
