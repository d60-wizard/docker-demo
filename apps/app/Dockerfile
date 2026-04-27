# 1. Используем Node 18 (или 20), так как Node 13/14 уже не поддерживают новые версии Babel/PostCSS
FROM node:18-alpine as build-stage

# 2. Устанавливаем рабочую директорию в корень (для монорепозитория это важно)
WORKDIR /app

# 3. Копируем файлы зависимостей из корня и из приложения
# Если у тебя Nx или Workspace, npm install должен запускаться там, где лежит package-lock.json
COPY package*.json ./
COPY apps/app/package*.json ./apps/app/

# 4. Устанавливаем зависимости. 
# Используем --legacy-peer-deps, если зависимости старые и конфликтуют
RUN npm install --legacy-peer-deps

# 5. Копируем всё содержимое проекта
COPY . .

# 6. Переходим в директорию приложения для сборки
WORKDIR /app/apps/app

# 7. Сборка. В Node 18+ переменные окружения прокидываются так же
ARG env=prod
RUN PUBLIC_URL=http://127.0.0.1:3001 npm run build

# --- Финальный этап: Nginx ---
FROM nginx:stable-alpine

# 8. Копируем билд. Обрати внимание: 
# результат сборки обычно лежит в /app/apps/app/build или /app/dist/apps/app
COPY --from=build-stage /app/apps/app/build /usr/share/nginx/html

# 9. Копируем конфиг nginx
COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
