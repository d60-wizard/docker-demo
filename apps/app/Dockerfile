FROM node:14-alpine as build-stage

WORKDIR /app

# 1. Копируем ВСЕ файлы манифестов сразу
COPY package*.json ./
COPY apps/app/package*.json ./apps/app/

# 2. Устанавливаем зависимости в папке фронтенда. 
# Это создаст node_modules прямо внутри apps/app/node_modules
WORKDIR /app/apps/app
RUN npm install

# 3. Возвращаемся в корень и копируем остальной код
WORKDIR /app
COPY . .

# 4. Сборка
WORKDIR /app/apps/app
ENV TSC_COMPILE_ON_ERROR=true
ENV SKIP_PREFLIGHT_CHECK=true
ARG env=prod

# Добавляем CI=false, чтобы игнорировать ошибки типов из соседних папок (api)
RUN PUBLIC_URL=http://127.0.0.1:3001 CI=false npm run build

# --- Финальный этап: Nginx ---
FROM nginx:stable-alpine
# Проверь путь: обычно build ложится в папку приложения
COPY --from=build-stage /app/apps/app/build /usr/share/nginx/html
COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]FROM node:14-alpine as build-stage

WORKDIR /app

# 1. Копируем ВСЕ файлы манифестов сразу
COPY package*.json ./
COPY apps/app/package*.json ./apps/app/

# 2. Устанавливаем зависимости в папке фронтенда. 
# Это создаст node_modules прямо внутри apps/app/node_modules
WORKDIR /app/apps/app
RUN npm install

# 3. Возвращаемся в корень и копируем остальной код
WORKDIR /app
COPY . .

# 4. Сборка
WORKDIR /app/apps/app
ENV TSC_COMPILE_ON_ERROR=true
ENV SKIP_PREFLIGHT_CHECK=true
ARG env=prod

# Добавляем CI=false, чтобы игнорировать ошибки типов из соседних папок (api)
RUN PUBLIC_URL=http://127.0.0.1:3001 CI=false npm run build

# --- Финальный этап: Nginx ---
FROM nginx:stable-alpine
# Проверь путь: обычно build ложится в папку приложения
COPY --from=build-stage /app/apps/app/build /usr/share/nginx/html
COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
