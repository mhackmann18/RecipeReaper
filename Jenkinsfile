pipeline {
  agent any

  environment {
    AWS_ACCOUNT_ID="936682307518"
    AWS_CLI_PROFILE_NAME="mr-muffin"
    AWS_DEFAULT_REGION="us-east-2"
    IMAGE_REPO_NAME="recipe_reaper"
    REPOSITORY_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
  }
  
  stages {
    stage('Logging into AWS ECR...') {
      steps {
        script { 
          sh "docker login --username AWS --password \$(aws ecr get-login-password --region ${AWS_DEFAULT_REGION} --profile ${AWS_CLI_PROFILE_NAME}) ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
        }
      }
    }

    stage('Building images...') {
      steps {
        echo 'building...'
      }
    }
  }
}
