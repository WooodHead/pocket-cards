# # output "cloudfront_ditribution_id" {
# #   value = "${aws_cloudfront_distribution.this.id}"
# # }

# output "web_domain_name" {
#   value     = aws_acm_certificate.web
#   sensitive = true
# }

# output "ecs_service" {
#   value = aws_ecs_service.this
# }



# ----------------------------------------------------------------------------------------------
# ALB URL
# ----------------------------------------------------------------------------------------------
output "alb_url" {
  value = "https://backend.${local.domain_name}"
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
  value = aws_cognito_user_pool.this.id
}

# ----------------------------------------------------------------------------------------------
# Cognito User Pool Client ID
# ----------------------------------------------------------------------------------------------
output "cognito_user_pool_client_id" {
  value = aws_cognito_user_pool_client.this.id
}

# ----------------------------------------------------------------------------------------------
# Cognito Identity Pool ID
# ----------------------------------------------------------------------------------------------
output "cognito_identity_pool_id" {
  value = aws_cognito_identity_pool.this.id
}
