FROM node:20-alpine

WORKDIR /app

COPY Anher-Backend/package*.json ./
RUN npm ci --omit=dev

COPY Anher-Backend/ ./

RUN mkdir -p uploads

EXPOSE 5000

CMD ["node", "index.js"]
