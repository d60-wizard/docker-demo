# Этап 1: Сборка
FROM node:14-alpine as build-stage

WORKDIR /app

# Копируем конфиги зависимостей
COPY package*.json ./
COPY apps/app/package*.json ./apps/app/

# Ставим ВСЕ зависимости (и корневые, и для фронта)
# Используем --unsafe-perm, так как alpine иногда капризничает с правами
RUN npm install --unsafe-perm

# Копируем весь исходный код
COPY . .

# Переходим в папку фронтенда
WORKDIR /app/apps/app

# КЛЮЧЕВОЙ МОМЕНТ: 
# Добавляем корневой node_modules/.bin в PATH, чтобы система видела react-app-rewired
ENV PATH /app/node_modules/.bin:$PATH

ENV TSC_COMPILE_ON_ERROR=true
ENV SKIP_PREFLIGHT_CHECK=true
ENV PUBLIC_URL=/

# Запускаем сборку
RUN CI=false npm run build

# --- Проверка на месте ---
RUN ls -la build/index.html

# Этап 2: Раздача
FROM nginx:stable-alpine
COPY --from=build-stage /app/apps/app/build /usr/share/nginx/html
COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
