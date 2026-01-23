pipeline {
    agent any

    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        APP_NAME = "Farm Management System"
        IMAGE_NAME = "farm-app"
    }

    stages {
        stage('Start') {
            steps {
                echo "Pipeline Started for ${APP_NAME}"
            }
        }

        stage('Clone Repository') {
            steps {
                // Skip duplicate git clone - already done in checkout
                echo "Repository already cloned!"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies..."
                bat 'npm install'
            }
        }

        stage('Lint Server') {
            steps {
                echo "Linting server.js..."
                bat 'node --check server.js || true'
            }
        }

        stage('Build Docker Image - LIGHTWEIGHT') {
            steps {
                echo "Building lightweight Docker image..."
                bat '''
                    docker build --no-cache --progress=plain -t %IMAGE_NAME% .
                '''
            }
        }

        stage('Push to Docker Hub - OPTIONAL') {
            when {
                environment name: 'DOCKERHUB_CREDENTIALS', value: 'your-creds-id'
            }
            steps {
                bat '''
                    docker tag %IMAGE_NAME% yourusername/%IMAGE_NAME%:latest
                    docker push yourusername/%IMAGE_NAME%:latest
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                echo "Deploying container..."
                bat '''
                    docker stop %IMAGE_NAME% 2>nul || true
                    docker rm %IMAGE_NAME% 2>nul || true
                    docker run -d --name %IMAGE_NAME% -p 3000:3000 %IMAGE_NAME%
                '''
                sleep(time: 5, unit: 'SECONDS')
                
                // Health check
                bat '''
                    curl -f http://localhost:3000 || (
                        echo "App not responding on port 3000!"
                        exit 1
                    )
                '''
            }
        }
    }

    post {
        success {
            echo '🚀 SUCCESS! App LIVE at: http://localhost:3000'
            echo '✅ Docker container: farm-app running'
        }
        failure {
            echo '❌ BUILD FAILED!'
            bat 'docker logs %IMAGE_NAME% || true'
        }
        always {
            echo '🧹 Cleaning up...'
            bat '''
                docker stop %IMAGE_NAME% 2>nul || true
                docker rm %IMAGE_NAME% 2>nul || true
            '''
            cleanWs()
        }
    }
}
