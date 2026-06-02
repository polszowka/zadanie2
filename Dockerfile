FROM node:24-alpine

LABEL org.opencontainers.image.authors="Olszówka Paweł"

WORKDIR /app

COPY server.js .

EXPOSE 8080

HEALTHCHECK CMD wget --spider http://localhost:8080 || exit 1

CMD ["node", "server.js"]