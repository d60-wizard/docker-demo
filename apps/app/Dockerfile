FROM node:14-alpine as build-stage

WORKDIR /app

# 1. Копируем ВСЕ package.json (и корневой, и приложения)
COPY package*.json ./
COPY apps/app/package*.json ./apps/app/

# 2. Переходим в папку приложения и ставим зависимости ТАМ. 
# Это создаст node_modules прямо в apps/app, и react-app-rewired точно найдется.
WORKDIR /app/apps/app
RUN npm install

# 3. Теперь копируем весь остальной код
WORKDIR /app
COPY . .

# 4. Собираем приложение
WORKDIR /app/apps/app
ARG env=prod
RUN PUBLIC_URL=http://127.0.0.1:3001 npm run build

# --- Финальный этап ---
FROM nginx:stable-alpine
COPY --from=build-stage /app/apps/app/build /usr/share/nginx/html
COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
