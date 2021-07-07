# -----------------------------------------------------------------------------------------------------
# AWS Route53
# -----------------------------------------------------------------------------------------------------
resource "aws_route53_zone" "this" {
  name = "${var.project_name}.${var.domain_name}"
}
