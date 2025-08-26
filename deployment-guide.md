# AWS Deployment Guide for Amarjeet's Portfolio

## Overview
Your portfolio application is now built and ready for AWS deployment. The production build includes:
- Optimized React frontend (78KB CSS, 312KB JS)
- Node.js Express backend with health checks
- PostgreSQL database integration
- Professional chatbot functionality

## Deployment Options

### Option 1: EC2 with PM2 (Recommended)

1. **Launch EC2 Instance**
   - Amazon Linux 2 or Ubuntu 20.04+
   - t3.micro or t3.small instance
   - Security Group: Allow HTTP (80), HTTPS (443), SSH (22)

2. **Setup Environment**
   ```bash
   # Install Node.js 20
   curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
   sudo yum install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   ```

3. **Deploy Application**
   ```bash
   # Upload deployment folder to EC2
   scp -r deployment/ ec2-user@your-ec2-ip:~/
   
   # On EC2 instance
   cd deployment
   npm install --production
   
   # Set environment variables
   export DATABASE_URL="your-neon-database-url"
   export NODE_ENV="production"
   
   # Start with PM2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Option 2: Docker on EC2

1. **Install Docker**
   ```bash
   sudo yum update -y
   sudo yum install -y docker
   sudo service docker start
   sudo usermod -a -G docker ec2-user
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. **Deploy with Docker**
   ```bash
   # Upload deployment folder
   scp -r deployment/ ec2-user@your-ec2-ip:~/
   
   # Create .env file
   echo "DATABASE_URL=your-neon-database-url" > .env
   
   # Start application
   docker-compose up -d
   ```

### Option 3: AWS Elastic Beanstalk

1. **Prepare EB Package**
   ```bash
   cd deployment
   zip -r portfolio-app.zip . -x "*.git*" "node_modules/*"
   ```

2. **Deploy to Elastic Beanstalk**
   - Create new EB application
   - Choose Node.js 20 platform
   - Upload portfolio-app.zip
   - Set environment variable: DATABASE_URL

## Environment Variables Required

```bash
DATABASE_URL=postgresql://username:password@host:5432/database
NODE_ENV=production
PORT=3000
```

## Domain Setup

1. **Route 53 (Optional)**
   - Create hosted zone for your domain
   - Point A record to EC2 Elastic IP

2. **SSL Certificate**
   ```bash
   # Install Certbot
   sudo yum install -y certbot python3-certbot-nginx
   
   # Get SSL certificate
   sudo certbot --nginx -d yourdomain.com
   ```

3. **Nginx Reverse Proxy** (Optional)
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Database Setup

Your application uses Neon PostgreSQL. Ensure your DATABASE_URL includes:
- Host, port, database name
- Username and password
- SSL mode (required for Neon)

Example: `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/portfolio?sslmode=require`

## Monitoring

- Health check endpoint: `GET /api/health`
- PM2 monitoring: `pm2 monit`
- Application logs: `pm2 logs amarjeet-portfolio`

## Cost Estimate

- EC2 t3.micro: ~$8.50/month
- Neon PostgreSQL: Free tier available
- Route 53: ~$0.50/month per hosted zone
- Elastic IP: Free when attached to running instance

Your application is production-ready and optimized for AWS deployment!