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
                sh 'docker build -t 0865079783/parkingfontend .'
            }
        }

        stage('Testing') {
            steps {
                echo 'Testing..'
            }
        }

        stage('Push image') {
            steps {
                  sh 'docker login -u="0865079783" -p="dearx2527"'
                  sh 'docker push 0865079783/parkingfontend:latest'
            }
        }

        stage('Prepare deploy') {
            steps {
                sshagent(credentials: ['jenkins-prod-server']) {
                    sh '''
                    [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
                    ssh-keyscan -t rsa,dsa example.com >> ~/.ssh/known_hosts
                    ssh ubuntu@prod.sandbox-me.com ...
                    scp -i  docker-compose.yml ubuntu@prod.sandbox-me.com:/parkingfontend
                    '''
                }
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
