# ----------------------------------------------------------------------------------------------
# CloudFront Distribution ID
# ----------------------------------------------------------------------------------------------
output "cloudfront_ditribution_id" {
  value = aws_cloudfront_distribution.this.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway URL
# ----------------------------------------------------------------------------------------------
output "api_url" {
  value = "https://api.${local.domain_name}"
}

# ----------------------------------------------------------------------------------------------
# Cognito Identity Pool Arn - Admin
# ----------------------------------------------------------------------------------------------
output "cognito_identity_pool_arn_admin" {
  sensitive = true
  value     = aws_cognito_identity_pool.admin.arn
}

# ----------------------------------------------------------------------------------------------
# Cognito Identity Pool Arn - Users
# ----------------------------------------------------------------------------------------------
output "cognito_identity_pool_arn_users" {
  sensitive = true
  value     = aws_cognito_identity_pool.this.arn
}

# ----------------------------------------------------------------------------------------------
# Cognito User Pool ID
# ----------------------------------------------------------------------------------------------
output "cognito_user_pool_id" {
  sensitive = true
  value     = aws_cognito_user_pool.this.id
}

# ----------------------------------------------------------------------------------------------
# Cognito User Pool Client ID
# ----------------------------------------------------------------------------------------------
output "cognito_user_pool_client_id" {
  sensitive = true
  value     = aws_cognito_user_pool_client.this.id
}

# ----------------------------------------------------------------------------------------------
# Cognito User Pool Client ID - iOS
# ----------------------------------------------------------------------------------------------
output "cognito_user_pool_client_id_ios" {
  sensitive = true
  value     = aws_cognito_user_pool_client.ios.id
}

# ----------------------------------------------------------------------------------------------
# Cognito Identity Pool ID
# ----------------------------------------------------------------------------------------------
output "cognito_identity_pool_id" {
  sensitive = true
  value     = aws_cognito_identity_pool.this.id
}

# ----------------------------------------------------------------------------------------------
# Cognito Identity Pool ID
# ----------------------------------------------------------------------------------------------
output "cognito_user_pool_domain" {
  sensitive = true
  value     = "${aws_cognito_user_pool_domain.this.id}.auth.${local.region}.amazoncognito.com"
}

# ----------------------------------------------------------------------------------------------
# Cognito Callback URL
# ----------------------------------------------------------------------------------------------
output "cognito_callback_url" {
  value = one(aws_cognito_user_pool_client.this.callback_urls)
}

# ----------------------------------------------------------------------------------------------
# Cognito Logout URL
# ----------------------------------------------------------------------------------------------
output "cognito_logout_url" {
  value = one(aws_cognito_user_pool_client.this.logout_urls)
}

# ----------------------------------------------------------------------------------------------
# ECS Cluster Name
# ----------------------------------------------------------------------------------------------
output "ecs_cluster_name" {
  value = aws_ecs_cluster.this.name
}

# ----------------------------------------------------------------------------------------------
# ECS Service Name
# ----------------------------------------------------------------------------------------------
output "ecs_service_name_backend" {
  value = aws_ecs_service.this.name
}

# ----------------------------------------------------------------------------------------------
# ECS Service Name
# ----------------------------------------------------------------------------------------------
output "ecs_service_name_auth" {
  value = aws_ecs_service.auth.name
}

# ----------------------------------------------------------------------------------------------
# ECS Service Name
# ----------------------------------------------------------------------------------------------
output "ecs_service_name_users" {
  value = aws_ecs_service.users.name
}

# ----------------------------------------------------------------------------------------------
# API Gateway ID
# ----------------------------------------------------------------------------------------------
output "apigw_id" {
  value = aws_apigatewayv2_api.this.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway Authorizer ID - Cognito
# ----------------------------------------------------------------------------------------------
output "apigw_authorizer_id_cognito" {
  value = aws_apigatewayv2_authorizer.this.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway Authorizer ID - Lambda
# ----------------------------------------------------------------------------------------------
output "apigw_authorizer_id_lambda" {
  value = aws_apigatewayv2_authorizer.auth.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway ID - WebSocket
# ----------------------------------------------------------------------------------------------
output "apigw_id_wss" {
  value = aws_apigatewayv2_api.wss.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway Authorizer ID - WebSocket
# ----------------------------------------------------------------------------------------------
output "apigw_authorizer_id_wss" {
  value = aws_apigatewayv2_authorizer.wss.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway ID - Admin
# ----------------------------------------------------------------------------------------------
output "apigw_id_admin" {
  value = aws_apigatewayv2_api.admin.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway Authorizer ID - Admin
# ----------------------------------------------------------------------------------------------
output "apigw_authorizer_id_admin" {
  value = aws_apigatewayv2_authorizer.admin.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway Integration ID - Auth
# ----------------------------------------------------------------------------------------------
output "apigw_integration_id_auth" {
  value = aws_apigatewayv2_integration.auth.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway Integration ID - Backend
# ----------------------------------------------------------------------------------------------
output "apigw_integration_id_backend" {
  value = aws_apigatewayv2_integration.backend.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway Integration ID - Users
# ----------------------------------------------------------------------------------------------
output "apigw_integration_id_users" {
  value = aws_apigatewayv2_integration.users.id
}

# ----------------------------------------------------------------------------------------------
# ECS Service Auth Environment file bucket key
# ----------------------------------------------------------------------------------------------
output "ecs_service_env_key_auth" {
  value = aws_s3_object.auth.key
}

# ----------------------------------------------------------------------------------------------
# ECS Service Auth Environment file bucket key
# ----------------------------------------------------------------------------------------------
output "ecs_service_env_key_users" {
  value = aws_s3_object.users.key
}

# ----------------------------------------------------------------------------------------------
# ECS Service Auth Environment file bucket key
# ----------------------------------------------------------------------------------------------
output "ecs_service_env_key_backend" {
  value = aws_s3_object.backend.key
}

# ----------------------------------------------------------------------------------------------
# CloudMap - Namespace
# ----------------------------------------------------------------------------------------------
output "cloudmap_namespace" {
  value = aws_service_discovery_private_dns_namespace.this.name
}

# ----------------------------------------------------------------------------------------------
# CloudMap Service - Auth
# ----------------------------------------------------------------------------------------------
output "cloudmap_service_auth" {
  value = aws_service_discovery_service.auth.name
}

# ----------------------------------------------------------------------------------------------
# CloudMap Service - Users
# ----------------------------------------------------------------------------------------------
output "cloudmap_service_users" {
  value = aws_service_discovery_service.users.name
}

# ----------------------------------------------------------------------------------------------
# Lambda source key - Cognito Pre Signup
# ----------------------------------------------------------------------------------------------
output "lambda_source_key_cognito_post_signup" {
  value = aws_s3_object.lambda_cognito.key
}

# ----------------------------------------------------------------------------------------------
# Lambda source key - API Gateway Authorizer v2
# ----------------------------------------------------------------------------------------------
output "lambda_source_key_authorizer_v2" {
  value = aws_s3_object.lambda_authorizer_v2.key
}

# ----------------------------------------------------------------------------------------------
# Lambda source key - API Gateway Authorizer v1
# ----------------------------------------------------------------------------------------------
output "lambda_source_key_authorizer_v1" {
  value = aws_s3_object.lambda_authorizer_v1.key
}

# ----------------------------------------------------------------------------------------------
# IAM Policy Arn - CloudWatch Logs
# ----------------------------------------------------------------------------------------------
output "iam_policy_arn_cloudwatch_logs" {
  sensitive = true
  value     = aws_iam_policy.cloudwatch_logs_basic.arn
}

# ----------------------------------------------------------------------------------------------
# IAM Policy Arn - DynamoDB
# ----------------------------------------------------------------------------------------------
output "iam_policy_arn_dynamodb" {
  sensitive = true
  value     = aws_iam_policy.dynamodb_basic.arn
}

# ----------------------------------------------------------------------------------------------
# IAM Policy Arn - SES
# ----------------------------------------------------------------------------------------------
output "iam_policy_arn_ses" {
  sensitive = true
  value     = aws_iam_policy.ses_basic.arn
}

# ----------------------------------------------------------------------------------------------
# IAM Policy Arn - SNS
# ----------------------------------------------------------------------------------------------
output "iam_policy_arn_sns" {
  sensitive = true
  value     = aws_iam_policy.sns_basic.arn
}

# ----------------------------------------------------------------------------------------------
# SNS - Errors Notify
# ----------------------------------------------------------------------------------------------
output "sns_arn_errors_notify" {
  sensitive = true
  value     = aws_sns_topic.error_notify.arn
}
