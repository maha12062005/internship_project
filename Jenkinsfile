pipeline {
    agent any

    triggers {
        pollSCM('H/2 * * * *')
        
    }

    environment {
        APP_NAME = "Farm Management System"
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
    }

    post {
        success {
            echo "Pipeline executed successfully!"
        }
        failure {
            echo "Pipeline failed! Check logs."
        }
    }
}
// Existing stages ku aprm idhu add pannu (Docker stages)
pipeline {
    agent any
    stages {
        stage('Start') {
            steps {
                echo 'Pipeline Started for Farm Management System'
            }
        }
        
        stage('Clone Repository') {
            steps {
                git 'https://github.com/maha12062005/internship_project.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                bat 'npm install'
            }
        }
        
        stage('Check Server File') {
            steps {
                echo 'Checking server.js file...'
                bat 'node -c server.js'
            }
        }
        
        stage('Build Success') {
            steps {
                echo 'Project Build Successful!'
            }
        }
        
        // 🔥 THIS IS YOUR PROBLEM STAGE - CORRECT FORMAT
        stage('Build Docker Image') {
            steps {
                bat '''
                    docker build -t farm-management:latest .
                    docker stop farm-management || exit 0
                    docker rm farm-management || exit 0
                    docker run -d --name farm-management -p 5000:5000 farm-management:latest
                '''
                echo '🚜 Farm Management LIVE on http://localhost:5000'
            }
        }
    }
    post {
        always {
            echo 'Pipeline executed successfully!'
        }
    }
}
