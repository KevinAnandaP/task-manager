# Stage 1: Base & Development Dependencies
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

# Salin kode sumber
COPY . .

# Stage 2: Production Runner
FROM node:18-alpine AS runner

WORKDIR /usr/src/app

COPY package*.json ./

# Hanya instal dependencies untuk production (menghindari devDependencies)
RUN npm ci --only=production

# Salin kode dari stage builder
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/public ./public

# Expose port aplikasi
EXPOSE 3000

# Set environment ke production
ENV NODE_ENV=production

CMD ["node", "src/server.js"]
