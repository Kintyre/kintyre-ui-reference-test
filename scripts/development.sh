#!/bin/bash
# Install AWS CLI
#******************************************************************************
pip install awscli
# Configure the AWS Profile
#******************************************************************************
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set region $AWS_DEFAULT_REGION
# Install packages
#******************************************************************************
npm install --silent
# Create build directory
#******************************************************************************
REACT_APP_API_URL=$REACT_APP_PROD_API_URL REACT_APP_API_KEY=$REACT_APP_PROD_API_KEY npm run build
# Create, modify, and sync S3 bucket
#******************************************************************************
aws s3 mb $INT_S3_URL
aws s3 website $INT_S3_URL --index-document index.html --error-document index.html
aws s3 sync build $INT_S3_URL --acl public-read