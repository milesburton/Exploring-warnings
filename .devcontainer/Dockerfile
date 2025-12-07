FROM mcr.microsoft.com/devcontainers/javascript-node:22

# Install Angular CLI
RUN npm install -g @angular/cli@19

# Install system libraries required by Playwright Chromium
RUN apt-get update \
	&& DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
	   libnspr4 \
	   libnss3 \
	   libdbus-1-3 \
	   libatk1.0-0 \
	   libatk-bridge2.0-0 \
	   libcups2 \
	   libdrm2 \
	   libxkbcommon0 \
	   libgtk-3-0 \
	   libgbm1 \
	   libasound2 \
	   libepoxy0 \
	   libxcomposite1 \
	   libxfixes3 \
	   libxcursor1 \
	   libxdamage1 \
	   libxrandr2 \
	   libxinerama1 \
	   libxshmfence1 \
	   xkb-data \
	&& rm -rf /var/lib/apt/lists/*
