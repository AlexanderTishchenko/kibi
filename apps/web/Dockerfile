# ---------- base ----------
FROM node:20-alpine
WORKDIR /usr/src                         
# корень монорепы

# 1. манифесты + конфиг workspaces
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./

# 2. манифест фронта (чтобы расчёт зависимостей прошёл)
COPY apps/web/package.json apps/web/pnpm-lock.yaml* apps/web/

# 3. исходники ( .dockerignore => node_modules, .next, dist, *.log )
COPY apps/web apps/web

# 4. PNPM + установка **всех** workspaces
RUN npm i -g pnpm \
 && pnpm install --frozen-lockfile --recursive   
 # <-- ключевой флаг!

# 5. запускаем фронт-workspace
WORKDIR /usr/src/apps/web
EXPOSE 3000
CMD ["pnpm", "dev"]
