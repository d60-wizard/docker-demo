FROM node:16-alpine as build-stage
# ^ Взял 16, так как у тебя amqplib требует node <= 15 (18-я может давать ошибки в рантайме), 
# но 16 обычно еще переваривает старые пакеты лучше, чем 18.

WORKDIR /app

# Копируем все файлы манифестов
COPY package*.json ./
COPY apps/app/package*.json ./apps/app/

# Устанавливаем зависимости в корень
RUN npm install --legacy-peer-deps

# Копируем весь исходный код
COPY . .

# --- КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ ---
# Вместо перехода в WORKDIR и запуска npm run build там,
# запускаем билд через флаг --prefix, чтобы npm видел node_modules в корне.
ARG env=prod
RUN PUBLIC_URL=http://127.0.0.1:3001 npm run build --prefix apps/app

# --- Финальный этап ---
FROM nginx:stable-alpine
# Путь к билду обычно такой, если react-scripts настроен стандартно внутри папки приложения
COPY --from=build-stage /app/apps/app/build /usr/share/nginx/html
COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
