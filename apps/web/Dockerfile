# ---------- base ----------
FROM node:20-alpine
WORKDIR /usr/src            
# корень монорепо

# ---------- 1. копируем код целиком (кроме node_modules*) ----------
COPY . .

# (убедись, что в .dockerignore есть:
#   node_modules
#   .next
#   dist
#   *.log
# )

# ---------- 2. ставим PNPM + все зависимости воркспейсов ----------
RUN npm i -g pnpm \
 && pnpm install --frozen-lockfile

# ---------- 3. работаем в папке фронта ----------
WORKDIR /usr/src/apps/web
EXPOSE 3000

CMD ["pnpm", "dev"]


# FROM node:20-alpine

# # 1. Корень репозитория
# WORKDIR /usr/src

# # 2. Копируем МАНИФЕСТЫ всего монорепо
# COPY package.json pnpm-lock.yaml* ./
# COPY apps/web/package.json apps/web/pnpm-lock.yaml* apps/web/

# # 3. Ставим pnpm и ВСЕ зависимости workspaces
# RUN npm i -g pnpm \
#  && pnpm install --frozen-lockfile

# # 4. Копируем исходники (минимум — фронт)
# COPY apps/web apps/web

# # 5. Переходим в папку фронта
# WORKDIR /usr/src/apps/web

# # 6. Порт Next.js
# EXPOSE 3000

# # 7. Запускаем именно workspace `apps/web`
# CMD ["pnpm", "--filter", "./apps/web", "dev"]
