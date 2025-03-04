#!/bin/bash

# Set paths to your project folders on the EC2 instance
FRONTEND_PATH="/var/www/frontend"
BACKEND_PATH="/var/www/backend"

# SSH into the EC2 instance and run deployment commands
ssh -o StrictHostKeyChecking=no ec2-user@yec2-16-170-245-38.eu-north-1.compute.amazonaws.com<< 'EOF'

# 1. Deploy Backend
echo "Deploying Backend..."
cd $BACKEND_PATH
git pull origin master   # Pull the latest code from GitLab (or your source control)
npm install              # Install dependencies
pm2 stop backend || true # Stop the previous instance (if any)
pm2 start server.js --name backend  # Start the backend with PM2
pm2 save                 # Save the PM2 process list

# 2. Deploy Frontend
echo "Deploying Frontend..."
cd $FRONTEND_PATH
git pull origin master   # Pull the latest code from GitLab
npm install              # Install dependencies
npm run build            # Build the Vue app for production

# Optionally, if you have Nginx configured to serve the Vue app:
sudo systemctl restart nginx   # Restart Nginx to reflect changes

EOF

echo "Deployment completed!"
