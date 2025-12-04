#!/bin/bash
set -e  # Dừng script ngay khi có lệnh bị lỗi

# Rebuild server
echo "Rebuilding server..."
yarn --cwd projects/server rebuild || {
  echo "Rebuild failed. Please check the logs above for errors."
  exit 1
}

# Build client app
echo "Building client..."
yarn --cwd projects/app-client build || {
  echo "Build failed. Please check the logs above for errors."
  exit 1
}

# Run build script
echo "Running build script..."
node build.js || {
  echo "Build script failed. Please check the logs above for errors."
  exit 1
}

echo "✅ All tasks completed successfully!"
