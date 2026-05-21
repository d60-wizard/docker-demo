# Этап 1: Сборка всего монорепозитория
FROM node:14-alpine as build
WORKDIR /opt/app
ADD *.json ./
RUN npm install
ADD . .
RUN npm run build converter

# Этап 2: Финальный легковесный образ
FROM node:14-alpine
WORKDIR /opt/app

# Вместо повторного npm install копируем проверенные node_modules из билда
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/dist/apps/converter ./dist
COPY package.json ./

CMD ["node", "./dist/main.js"]
