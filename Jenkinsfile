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
stage('Build Docker Image') {
    steps {
        script {
            // Build Docker image
            bat 'docker build -t farm-management:latest .'
            
            // Stop old container if running
            bat 'docker stop farm-management || exit 0'
            bat 'docker rm farm-management || exit 0'
            
            // Run new container with PORT 5000
            bat 'docker run -d --name farm-management -p 5000:5000 -p 5001:5001 farm-management:latest'
            
            echo 'Farm Management System running on http://localhost:5000'
        }
    }
}
