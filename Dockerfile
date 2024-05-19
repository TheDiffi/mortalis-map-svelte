FROM node:18-alpine


WORKDIR /app

COPY package*.json ./
COPY svelte.config.js ./
COPY vite.config.ts ./
RUN npm install

COPY . .

EXPOSE 5174

CMD [ "npm", "run", "dev-host" ]


