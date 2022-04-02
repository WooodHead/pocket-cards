locals {
  # ----------------------------------------------------------------------------------------------
  # Environment
  # ----------------------------------------------------------------------------------------------
  remote_setup    = data.terraform_remote_state.setup.outputs
  remote_services = data.terraform_remote_state.services.outputs

  # ----------------------------------------------------------------------------------------------
  # Project Informations
  # ----------------------------------------------------------------------------------------------
  # domain_name     = data.aws_route53_zone.this.name
  project_name    = local.remote_setup.project_name
  project_name_uc = local.remote_setup.project_name_uc

  # ----------------------------------------------------------------------------------------------
  # ECS
  # ----------------------------------------------------------------------------------------------
  ecs_cluster_name         = local.remote_services.ecs_cluster_name
  ecs_service_name_auth    = local.remote_services.ecs_service_name_auth
  ecs_service_name_backend = local.remote_services.ecs_service_name_backend
  ecs_service_name_users   = local.remote_services.ecs_service_name_users

  ecs_service_env_key_auth    = local.remote_services.ecs_service_env_key_auth
  ecs_service_env_key_backend = local.remote_services.ecs_service_env_key_backend
  ecs_service_env_key_users   = local.remote_services.ecs_service_env_key_users

  # ----------------------------------------------------------------------------------------------
  # Lambda
  # ----------------------------------------------------------------------------------------------
  lambda_handler          = "index.handler"
  lambda_runtime          = "nodejs14.x"
  lambda_basic_policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"

  # ----------------------------------------------------------------------------------------------
  # DynamoDB
  # ----------------------------------------------------------------------------------------------
  dynamodb_name_users       = local.remote_setup.dynamodb_name_users
  dynamodb_name_groups      = local.remote_setup.dynamodb_name_groups
  dynamodb_name_words       = local.remote_setup.dynamodb_name_words
  dynamodb_name_word_master = local.remote_setup.dynamodb_name_word_master
  dynamodb_name_word_ignore = local.remote_setup.dynamodb_name_word_ignore
  dynamodb_name_histories   = local.remote_setup.dynamodb_name_histories
  dynamodb_name_questions   = local.remote_setup.dynamodb_name_questions
  dynamodb_name_learning    = local.remote_setup.dynamodb_name_learning
  dynamodb_name_traces      = local.remote_setup.dynamodb_name_traces
  dynamodb_name_settings    = local.remote_setup.dynamodb_name_settings

  # ----------------------------------------------------------------------------------------------
  # API Gateway
  # ----------------------------------------------------------------------------------------------
  apigw_id                     = local.remote_services.api_gateway_id
  apigw_id_admin               = local.remote_services.api_gateway_id_admin
  apigw_authorizer_id_cognito  = local.remote_services.apigw_authorizer_id_cognito
  apigw_authorizer_id_lambda   = local.remote_services.apigw_authorizer_id_lambda
  apigw_authorizer_id_admin    = local.remote_services.api_gateway_authorizer_id_admin
  apigw_integration_id_auth    = local.remote_services.apigw_integration_id_auth
  apigw_integration_id_backend = local.remote_services.apigw_integration_id_backend
  apigw_integration_id_users   = local.remote_services.apigw_integration_id_users

  # ----------------------------------------------------------------------------------------------
  # Cloud Map
  # ----------------------------------------------------------------------------------------------
  cloudmap_namespace     = local.remote_services.cloudmap_namespace
  cloudmap_service_auth  = local.remote_services.cloudmap_service_auth
  cloudmap_service_users = local.remote_services.cloudmap_service_users

  # ----------------------------------------------------------------------------------------------
  # S3
  # ----------------------------------------------------------------------------------------------
  bucket_name_archive   = local.remote_setup.bucket_name_archive
  bucket_name_frontend  = local.remote_setup.bucket_name_frontend
  bucket_name_materials = local.remote_setup.bucket_name_materials

  # ----------------------------------------------------------------------------------------------
  # SSM
  # ----------------------------------------------------------------------------------------------
  ssm_ipa_api_url         = local.remote_setup.ssm_ipa_api_url
  ssm_ipa_api_key         = local.remote_setup.ssm_ipa_api_key
  ssm_translation_api_url = local.remote_setup.ssm_translation_api_url
  ssm_translation_api_key = local.remote_setup.ssm_translation_api_key
  ssm_vision_api_url      = local.remote_setup.ssm_vision_api_url
  ssm_vision_api_key      = local.remote_setup.ssm_vision_api_key
  ssm_repo_url_batch      = local.remote_setup.ssm_repo_url_batch

  # ----------------------------------------------------------------------------------------------
  # Cognito
  # ----------------------------------------------------------------------------------------------
  cognito_identity_pool_arn_admin = local.remote_services.cognito_identity_pool_arn_admin
  cognito_identity_pool_arn_users = local.remote_services.cognito_identity_pool_arn_users
}

# ----------------------------------------------------------------------------------------------
# ECS Cluster
# ----------------------------------------------------------------------------------------------
data "aws_ecs_cluster" "this" {
  cluster_name = local.ecs_cluster_name
}

# ----------------------------------------------------------------------------------------------
# ECS Service - Backend
# ----------------------------------------------------------------------------------------------
data "aws_ecs_service" "backend" {
  cluster_arn  = data.aws_ecs_cluster.this.arn
  service_name = local.ecs_service_name_backend
}

# ----------------------------------------------------------------------------------------------
# ECS Service - Auth Manager
# ----------------------------------------------------------------------------------------------
data "aws_ecs_service" "auth" {
  cluster_arn  = data.aws_ecs_cluster.this.arn
  service_name = local.ecs_service_name_auth
}

# ----------------------------------------------------------------------------------------------
# ECS Service - User Manager
# ----------------------------------------------------------------------------------------------
data "aws_ecs_service" "users" {
  cluster_arn  = data.aws_ecs_cluster.this.arn
  service_name = local.ecs_service_name_users
}

# ----------------------------------------------------------------------------------------------
# APIGateway - Admin
# ----------------------------------------------------------------------------------------------
data "aws_apigatewayv2_api" "admin" {
  api_id = local.apigw_id_admin
}

# ----------------------------------------------------------------------------------------------
# SSM Parameter - IPA URL
# ----------------------------------------------------------------------------------------------
data "aws_ssm_parameter" "ipa_api_url" {
  name            = local.ssm_ipa_api_url
  with_decryption = true
}

# ----------------------------------------------------------------------------------------------
# SSM Parameter - IPA Key
# ----------------------------------------------------------------------------------------------
data "aws_ssm_parameter" "ipa_api_key" {
  name            = local.ssm_ipa_api_key
  with_decryption = true
}

# ----------------------------------------------------------------------------------------------
# SSM Parameter - Translation API URL
# ----------------------------------------------------------------------------------------------
data "aws_ssm_parameter" "translation_api_url" {
  name            = local.ssm_translation_api_url
  with_decryption = true
}

# ----------------------------------------------------------------------------------------------
# SSM Parameter - Translation API Key
# ----------------------------------------------------------------------------------------------
data "aws_ssm_parameter" "translation_api_key" {
  name            = local.ssm_translation_api_key
  with_decryption = true
}

# ----------------------------------------------------------------------------------------------
# SSM Parameter - Vision API URL
# ----------------------------------------------------------------------------------------------
data "aws_ssm_parameter" "vision_api_url" {
  name            = local.ssm_vision_api_url
  with_decryption = true
}

# ----------------------------------------------------------------------------------------------
# SSM Parameter - Vision API Key
# ----------------------------------------------------------------------------------------------
data "aws_ssm_parameter" "vision_api_key" {
  name            = local.ssm_vision_api_key
  with_decryption = true
}

# ----------------------------------------------------------------------------------------------
# SSM Parameter Store - Batch repository url
# ----------------------------------------------------------------------------------------------
data "aws_ssm_parameter" "repo_url_batch" {
  name = local.ssm_repo_url_batch
}
