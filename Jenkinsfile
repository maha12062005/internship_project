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
        echo 'Building Docker image...'
        script {
            def image = docker.build("mahalakshmi-farm:${env.BUILD_ID}")
        }
    }
}

stage('Push to Docker Hub') {
    steps {
        echo 'Pushing to Docker Hub...'
        script {
            docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-id') {
                def image = docker.image("mahalakshmi-farm:${env.BUILD_ID}")
                image.push()
                image.push('latest')
            }
        }
    }
}
