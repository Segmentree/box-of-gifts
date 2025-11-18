#!/bin/bash

# Build Linux app from macOS using Docker
docker run --rm -v "$(pwd)":/app -w /app \
  -e CARGO_HOME=/app/.cargo \
  rust:latest \
  bash -c "
    apt-get update && \
    apt-get install -y libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install && \
    npm run tauri:build
  "

echo "Linux build complete! Check src-tauri/target/release/bundle/"
