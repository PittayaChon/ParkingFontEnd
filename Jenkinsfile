pipeline {
    environment {
    registryCredential = ''
    dockerImage = ''
  }
  agent  any
    stages {
        stage('Clone git') {
            steps {
                script{
                checkout scm
                }
            }
        }

        stage('Build image') {
            steps {
                sh 'docker image rm parkingfontend -f'
                sh 'docker image prune -a -f'
                sh 'docker volume prune -f'
                sh 'docker build -t parkingfontend .'
                //   script{
                // //    app = docker.build('api:latest')
                //    dockerImage = docker.build registry + ":latest"
                //   }
            }
        }

        stage('Testing') {
            steps {
                echo 'Testing..'
            }
        }

        stage('Push image') {
            steps {
                  echo '..'
            }
        }

        stage('Prepare deploy') {
            steps {
                    echo 'Building..'
            }
        }

        stage('Deploy on production') {
            steps {
              script {
                    echo 'Building..'
                }
              }
        }
    }
}
