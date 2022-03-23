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
output "ecs_service_name" {
  value = aws_ecs_service.this.name
}

# ----------------------------------------------------------------------------------------------
# API Gateway ID
# ----------------------------------------------------------------------------------------------
output "api_gateway_id" {
  value = aws_apigatewayv2_api.this.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway Authorizer ID
# ----------------------------------------------------------------------------------------------
output "api_gateway_authorizer_id" {
  value = aws_apigatewayv2_authorizer.this.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway ID - Admin
# ----------------------------------------------------------------------------------------------
output "api_gateway_id_admin" {
  value = aws_apigatewayv2_api.admin.id
}

# ----------------------------------------------------------------------------------------------
# API Gateway Authorizer ID - Admin
# ----------------------------------------------------------------------------------------------
output "api_gateway_authorizer_id_admin" {
  value = aws_apigatewayv2_authorizer.admin.id
}


# ----------------------------------------------------------------------------------------------
# Repository URL (Batch)
# ----------------------------------------------------------------------------------------------
output "ssm_repo_url_batch" {
  value = aws_ssm_parameter.repo_url_batch.name
}
