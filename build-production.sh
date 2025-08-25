#!/bin/bash

echo "🚀 Building Token of Thanks for Production..."

# Build Frontend
echo "📦 Building Frontend..."
cd frontend
npm install
npm run build
echo "✅ Frontend built successfully"

# Build Backend
echo "🔧 Preparing Backend..."
cd ../backend
npm install
echo "✅ Backend prepared successfully"

# Create production package
echo "📁 Creating production package..."
cd ..
mkdir -p production
cp -r frontend/build production/frontend
cp -r backend production/backend
cp DEPLOYMENT.md production/
cp README.md production/

echo "🎉 Production build complete!"
echo "📁 Check the 'production' folder for deployment files"
echo "📖 Read DEPLOYMENT.md for deployment instructions"
