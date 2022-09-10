FROM node:16-alpine as frontend
WORKDIR /app/frontend
COPY frontend/ ./
RUN npm ci
RUN npm run build

FROM node:16-alpine as backend
WORKDIR /app/backend
COPY ./backend/ ./
RUN npm ci
RUN npm run build

FROM node:16-alpine
WORKDIR /app/
COPY --from=frontend /app/frontend/build ./frontend/build
COPY --from=backend /app/backend ./backend

EXPOSE 8080
CMD ["node", "/app/backend/dist/index.js"]