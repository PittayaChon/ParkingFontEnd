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
                //sh 'robot ui-automate/ui-parking-status.robot' 
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
                    sshagent(credentials: ['jenkins-production']) {
                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@prod.sandbox-me.com mkdir -p /home/ubuntu/parkingfontend'
                    sh 'scp -o StrictHostKeyChecking=no docker-compose.yml ubuntu@prod.sandbox-me.com:/home/ubuntu/parkingfontend/docker-compose.yml'
                    }
                }
        }
        
        stage('Deploy on production') {
            steps {
                    sshagent(credentials: ['jenkins-production']) {
                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@prod.sandbox-me.com docker-compose -f /home/ubuntu/parkingfontend/docker-compose.yml down'
                    sh 'docker image rm 0865079783/parkingfontend -f'
                    sh 'docker image prune -a -f'
                    sh 'docker volume prune -f'
                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@prod.sandbox-me.com docker-compose -f /home/ubuntu/parkingfontend/docker-compose.yml pull'
                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@prod.sandbox-me.com docker-compose -f /home/ubuntu/parkingfontend/docker-compose.yml up -d'
                    }
            }
        }
    }
}
