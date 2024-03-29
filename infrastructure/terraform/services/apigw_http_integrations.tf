# ---------------------------------------------------------------------------------------------
# API Gateway Integration - VPC_LINK
# ---------------------------------------------------------------------------------------------
resource "aws_apigatewayv2_integration" "backend" {
  api_id             = aws_apigatewayv2_api.this.id
  connection_type    = "VPC_LINK"
  connection_id      = aws_apigatewayv2_vpc_link.this.id
  integration_method = "ANY"
  integration_type   = "HTTP_PROXY"
  integration_uri    = aws_service_discovery_service.this.arn

  request_parameters = {
    "append:header.username" = "$context.authorizer.username"
    "append:header.guardian" = "$context.authorizer.guardian"
  }
}

# ---------------------------------------------------------------------------------------------
# API Gateway Integration - Auth
# ---------------------------------------------------------------------------------------------
resource "aws_apigatewayv2_integration" "auth" {
  api_id             = aws_apigatewayv2_api.this.id
  connection_type    = "VPC_LINK"
  connection_id      = aws_apigatewayv2_vpc_link.this.id
  integration_method = "ANY"
  integration_type   = "HTTP_PROXY"
  integration_uri    = aws_service_discovery_service.auth.arn

  request_parameters = {
    "append:header.username" = "$context.authorizer.username"
    "append:header.guardian" = "$context.authorizer.guardian"
  }
}

# ---------------------------------------------------------------------------------------------
# API Gateway Integration - Users
# ---------------------------------------------------------------------------------------------
resource "aws_apigatewayv2_integration" "users" {
  api_id             = aws_apigatewayv2_api.this.id
  connection_type    = "VPC_LINK"
  connection_id      = aws_apigatewayv2_vpc_link.this.id
  integration_method = "ANY"
  integration_type   = "HTTP_PROXY"
  integration_uri    = aws_service_discovery_service.users.arn

  request_parameters = {
    "append:header.username" = "$context.authorizer.username"
    "append:header.guardian" = "$context.authorizer.guardian"
  }
}
