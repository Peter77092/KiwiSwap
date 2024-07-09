FROM node:20

WORKDIR /app
EXPOSE 8080
RUN npm i -g pnpm

COPY . .

RUN pnpm i && pnpm build

CMD ["pnpm", "preview"]