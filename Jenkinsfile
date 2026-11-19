pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'ap-southeast-2'
        
        S3_BUCKET = 'budgethome-frontend-2026-699335924444-ap-southeast-2-an'

        CLOUDFRONT_ID = 'E3EI6NZ7HZCX8'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Node') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Angular') {
            steps {
                sh 'npx ng build --configuration production'
            }
        }

        stage('Deploy to S3') {
            steps {
                sh '''
                  aws s3 sync dist/budget-home/ \
                    s3://$S3_BUCKET \
                    --delete
                '''
            }
        }

        stage('CloudFront Invalidation') {
            steps {
                sh '''
                  aws cloudfront create-invalidation \
                    --distribution-id $CLOUDFRONT_ID \
                    --paths "/*"
                '''
            }
        }
    }
}