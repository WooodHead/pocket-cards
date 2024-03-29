# ---------------------------------------------------------------------------------------------
# API Gateway
# ---------------------------------------------------------------------------------------------
resource "aws_apigatewayv2_api" "wss" {
  name                       = "${local.project_name}-wss-api"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
}

# ---------------------------------------------------------------------------------------------
# API Gateway Stage
# ---------------------------------------------------------------------------------------------
resource "aws_api_gateway_account" "wss" {
  cloudwatch_role_arn = aws_iam_role.wss.arn
}

# ---------------------------------------------------------------------------------------------
# API Gateway Stage
# ---------------------------------------------------------------------------------------------
resource "aws_apigatewayv2_stage" "wss" {
  depends_on = [aws_api_gateway_account.wss]

  api_id = aws_apigatewayv2_api.wss.id
  name   = "v1"

  default_route_settings {
    throttling_burst_limit = 100
    throttling_rate_limit  = 100
  }

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.wss.arn
    format = jsonencode(
      {
        apiId              = "$context.apiId"
        httpMethod         = "$context.httpMethod"
        ip                 = "$context.identity.sourceIp"
        protocol           = "$context.protocol"
        requestId          = "$context.requestId"
        requestTime        = "$context.requestTime"
        responseLength     = "$context.responseLength"
        responseLatency    = "$context.responseLatency"
        routeKey           = "$context.routeKey"
        integrationLatency = "$context.integrationLatency"
        status             = "$context.status"
        error              = "$context.authorizer.error"
      }
    )
  }
}

# ---------------------------------------------------------------------------------------------
# API Gateway Domain Name
# ---------------------------------------------------------------------------------------------
resource "aws_apigatewayv2_domain_name" "wss" {
  depends_on  = [aws_acm_certificate_validation.api]
  domain_name = "socket.${local.domain_name}"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.api.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

# ---------------------------------------------------------------------------------------------
# API Gateway Domain API Mapping
# ---------------------------------------------------------------------------------------------
resource "aws_apigatewayv2_api_mapping" "wss" {
  api_id          = aws_apigatewayv2_api.wss.id
  domain_name     = aws_apigatewayv2_domain_name.wss.domain_name
  stage           = aws_apigatewayv2_stage.wss.id
}

# # ---------------------------------------------------------------------------------------------
# # API Gateway VPC Link
# # ---------------------------------------------------------------------------------------------
# resource "aws_api_gateway_vpc_link" "wss" {
#   name        = "${local.project_name}-wss"
#   target_arns = [aws_lb.wss[0].arn]

#   count = local.is_dev_only
# }
