FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY src/ src/
COPY .env .env

# Expose the port
EXPOSE 3001

# Start the application
CMD ["pnpm", "start"]