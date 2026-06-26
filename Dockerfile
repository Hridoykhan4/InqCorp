FROM node:20-alpine

WORKDIR /app

COPY SafetyPlus-Backend/package*.json ./
RUN npm ci --omit=dev

COPY SafetyPlus-Backend/ ./

RUN mkdir -p uploads

EXPOSE 5000

CMD ["node", "index.js"]
