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
post {
    success {
        echo '🚀 Farm Management System Build SUCCESS!'
        echo 'Project ready for deployment!'
    }
    failure {
        echo '❌ Build FAILED !'
        echo 'Check the logs above for errors'
    }
    always {
        echo 'Pipeline execution completed'
        cleanWs()  // Workspace clean pannidum
    }
}
