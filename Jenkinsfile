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
                git branch: 'main', url: 'https://github.com/maha12062005/internship_project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies..."
                bat '"C:\\Program Files\\nodejs\\npm.cmd" install'
            }
        }

        stage('Check Server File') {
            steps {
                echo "Checking server.js file..."
                bat 'node -c server.js'
            }
        }

        stage('Build Success') {
            steps {
                echo "Project Build Successful!"
            }
        }

        // ✅ DOCKER STAGES HERE - stages { } INNSIDE!
        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                bat 'docker build -t %IMAGE_NAME% .'
                bat 'docker tag %IMAGE_NAME% localhost:3000/%IMAGE_NAME%:latest'
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "Running Docker container..."
                bat 'docker stop %IMAGE_NAME% || true'
                bat 'docker rm %IMAGE_NAME% || true'
                bat 'docker run -d -p 3000:3000 --name %IMAGE_NAME% %IMAGE_NAME%'
            }
        }

        stage('Test Application') {
            steps {
                echo "Testing application..."
                bat 'curl http://localhost:3000 || exit 1'
            }
        }
    }

    post {
        success {
            echo '🚀 Farm Management System Build SUCCESS!'
            echo 'Project ready for deployment!'
            echo "App live at: http://localhost:3000"
        }
        failure {
            echo '❌ Build FAILED!'
            echo 'Check the logs above for errors'
        }
        always {
            echo 'Pipeline execution completed'
            bat 'docker stop %IMAGE_NAME% || true'
            bat 'docker rm %IMAGE_NAME% || true'
            cleanWs()
        }
    }
}
