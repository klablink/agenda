pipeline {
    agent {
        label "docker&&linux"
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        skipDefaultCheckout()
        ansiColor('xterm')
        disableResume()
    }

    stages {
        stage('publish npm') {
            steps {
                // Clean before build
                cleanWs()
                container("docker") {
                  checkoutScm()
                  withNpmLectraSaasConfig {
                    insideDockerWithIdentity("node:22-alpine","") {
                      sh "apk update && apk add git openssh-client"
                      sh "npm i"
                      sh "npm run build"
                      sh "npm publish"
                    }
                  }
                }
            }
        }
    }
    post {
        success {
            postGitLabStatus("success")
            cleanWs notFailBuild: true
        }
        failure {
            postGitLabStatus("failed")
            // notif KO
        }
        aborted {
            postGitLabStatus("canceled")
            // notif Abort
        }
    }

}
