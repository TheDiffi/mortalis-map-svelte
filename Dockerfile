FROM node:18-alpine as build
WORKDIR /app

COPY package*.json ./
COPY svelte.config.js ./
COPY vite.config.ts ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .

RUN npm ci --omit dev
EXPOSE 5050

CMD ["node", "build"]