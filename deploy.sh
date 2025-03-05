#!/bin/bash

# Set paths to your project folders on the EC2 instance
FRONTEND_PATH="/var/www/frontend"
BACKEND_PATH="/var/www/backend"

# SSH into the EC2 instance and run deployment commands
ssh -o StrictHostKeyChecking=no ec2-user@ec2-13-53-134-169.eu-north-1.compute.amazonaws.com<< 'EOF'

# 1. Deploy Backend
echo "Deploying Backend..."
cd $BACKEND_PATH
git pull origin master
npm install
pm2 stop backend || true
pm2 start server.js --name backend
pm2 save

# 2. Deploy Frontend
echo "Deploying Frontend..."
cd $FRONTEND_PATH
git pull origin master 
npm install              
npm run build            

sudo systemctl restart nginx 

EOF

echo "Deployment completed!"
