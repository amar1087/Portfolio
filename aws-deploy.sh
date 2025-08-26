#!/bin/bash

# AWS Deployment Script for Amarjeet's Portfolio
echo "🚀 Building and deploying Amarjeet's Portfolio to AWS..."

# Build the application
echo "📦 Building application..."
npm run build

# Create deployment package
echo "📋 Creating deployment package..."
mkdir -p deployment
cp -r dist/ deployment/
cp package*.json deployment/
cp ecosystem.config.js deployment/
cp Dockerfile deployment/
cp docker-compose.yml deployment/

# Copy shared files
cp -r shared/ deployment/

echo "✅ Deployment package created in './deployment' directory"
echo ""
echo "🎯 Next steps for AWS deployment:"
echo "1. Upload the 'deployment' folder to your EC2 instance"
echo "2. Install Node.js 20+ and PM2 on your EC2 instance"
echo "3. Set environment variables (DATABASE_URL, etc.)"
echo "4. Run: npm install --production"
echo "5. Run: pm2 start ecosystem.config.js"
echo ""
echo "📋 For Docker deployment:"
echo "1. Upload deployment folder to EC2"
echo "2. Install Docker and Docker Compose"
echo "3. Set DATABASE_URL in .env file"
echo "4. Run: docker-compose up -d"
echo ""
echo "🔧 Environment variables needed:"
echo "- DATABASE_URL (your Neon/PostgreSQL connection string)"
echo "- PORT (default: 3000)"