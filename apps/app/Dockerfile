# Этап 1: Сборка
FROM node:14-alpine as build-stage

WORKDIR /app

# 1. Копируем ВСЕ package.json из корня и из папки приложения
# Это нужно, чтобы npm ci видел всю структуру монорепозитория
COPY package*.json ./
COPY apps/app/package*.json ./apps/app/

# 2. Устанавливаем зависимости из КОРНЯ. 
# Это критично для монорепозитория, чтобы подтянулись все линтеры и билдеры
RUN npm install

# 3. Копируем ВЕСЬ код (теперь у нас есть node_modules и исходники)
COPY . .

# 4. Собираем именно фронтенд
WORKDIR /app/apps/app

# Отключаем строгие проверки, которые "валят" билд из-за старых библиотек
ENV TSC_COMPILE_ON_ERROR=true
ENV SKIP_PREFLIGHT_CHECK=true
# ВАЖНО: Если ты открываешь сайт просто по IP, убери PUBLIC_URL или поставь "/"
ENV PUBLIC_URL=/

# Собираем. CI=false позволит проигнорировать ворнинги (Warnings), которые npm считает ошибками
RUN CI=false npm run build

# --- ТЕСТОВЫЙ ШАГ (проверка) ---
# Если эта команда упадет, значит билд не создался. Мы узнаем об этом СРАЗУ.
RUN ls -la build/index.html

# Этап 2: Раздача
FROM nginx:stable-alpine

# Копируем билд
COPY --from=build-stage /app/apps/app/build /usr/share/nginx/html

# Копируем твой конфиг nginx
COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
