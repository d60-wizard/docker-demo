# 1. Используем 14-alpine, так как ваши зависимости (amqplib, angular-devkit) 
# жестко завязаны на старые версии Node.js (до 15 версии).
FROM node:14-alpine as build-stage

WORKDIR /app

# Копируем файлы манифестов
COPY package*.json ./
COPY apps/app/package*.json ./apps/app/

# Устанавливаем зависимости.
# В node 14 нет флага --legacy-peer-deps, но если npm обновится внутри образа, он может понадобиться.
RUN npm install

# Копируем весь исходный код
COPY . .

# Переходим в папку приложения
WORKDIR /app/apps/app

# Настраиваем PATH так, чтобы система видела бинарники из корневого node_modules
ENV PATH /app/node_modules/.bin:$PATH

ARG env=prod
RUN PUBLIC_URL=http://127.0.0.1:3001 npm run build

# --- Финальный этап: Nginx ---
FROM nginx:stable-alpine

# Копируем результат сборки
COPY --from=build-stage /app/apps/app/build /usr/share/nginx/html

# Копируем конфиг
COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
