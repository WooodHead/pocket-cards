# ----------------------------------------------------------------------------------------------
# Application Load Balancer
# ----------------------------------------------------------------------------------------------
resource "aws_lb" "this" {
  name               = "${local.project_name}-alb"
  internal           = !var.is_simple
  load_balancer_type = "application"
  security_groups    = [var.is_simple ? aws_security_group.alb_simple[0].id : aws_security_group.alb_normal[0].id]
  subnets            = module.vpc.public_subnets
}

# ----------------------------------------------------------------------------------------------
# Application Load Balancer Target Group
# ----------------------------------------------------------------------------------------------
resource "aws_lb_target_group" "this" {
  name_prefix                        = "bckend"
  port                               = 8080
  protocol                           = "HTTP"
  target_type                        = "ip"
  vpc_id                             = module.vpc.vpc_id
  lambda_multi_value_headers_enabled = false
  proxy_protocol_v2                  = false

  health_check {
    enabled             = true
    healthy_threshold   = 5
    interval            = 30
    matcher             = "200"
    path                = "/"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  lifecycle {
    create_before_destroy = true
  }
}

# ----------------------------------------------------------------------------------------------
# Application Load Balancer Target Group
# ----------------------------------------------------------------------------------------------
resource "aws_lb_listener" "this" {
  load_balancer_arn = aws_lb.this.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.arn
  }
}
