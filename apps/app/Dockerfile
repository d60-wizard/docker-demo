# Этап 1: Сборка
FROM node:14-alpine as build-stage

WORKDIR /app

# Копируем только файлы зависимостей
COPY package*.json ./
COPY apps/app/package*.json ./apps/app/

# Ставим зависимости в папке приложения
WORKDIR /app/apps/app
RUN npm install

# Копируем весь исходный код проекта
WORKDIR /app
COPY . .

# Переходим в приложение для финальной сборки
WORKDIR /app/apps/app

# Переменные, чтобы TS не блокировал билд из-за ошибок в соседнем бэкенде
ENV TSC_COMPILE_ON_ERROR=true
ENV SKIP_PREFLIGHT_CHECK=true
ARG env=prod

# Собираем фронт (CI=false заставляет игнорировать ошибки типов)
RUN PUBLIC_URL=http://127.0.0.1:3001 CI=false npm run build

# Этап 2: Раздача через Nginx
FROM nginx:stable-alpine

# Очищаем дефолтную папку nginx (на всякий случай)
RUN rm -rf /usr/share/nginx/html/*

# Копируем билд из первого этапа
COPY --from=build-stage /app/apps/app/build /usr/share/nginx/html

# Копируем конфиг
COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
