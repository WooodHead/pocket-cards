# -----------------------------------------------------------------------------------------------------
# AWS Certificate Manager - Web
# -----------------------------------------------------------------------------------------------------
resource "aws_acm_certificate" "global" {
  provider          = aws.global
  domain_name       = "*.${local.domain_name}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# -----------------------------------------------------------------------------------------------------
# AWS Certificate Manager - API
# -----------------------------------------------------------------------------------------------------
resource "aws_acm_certificate" "api" {
  domain_name       = "*.${local.domain_name}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# -----------------------------------------------------------------------------------------------------
# AWS Route53 Record - Web Certificate
# -----------------------------------------------------------------------------------------------------
resource "aws_route53_record" "acm" {
  provider = aws.global

  for_each = {
    for dvo in aws_acm_certificate.api.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  zone_id = data.aws_route53_zone.this.zone_id
  ttl     = 60
}

# -----------------------------------------------------------------------------------------------------
# AWS Certificate Manager - Web Validation
# -----------------------------------------------------------------------------------------------------
resource "aws_acm_certificate_validation" "global" {
  depends_on              = [aws_route53_record.acm]
  provider                = aws.global
  certificate_arn         = aws_acm_certificate.global.arn
  validation_record_fqdns = [for record in aws_route53_record.acm : record.fqdn]
}

# -----------------------------------------------------------------------------------------------------
# AWS Certificate Manager - Api Validation
# -----------------------------------------------------------------------------------------------------
resource "aws_acm_certificate_validation" "api" {
  depends_on              = [aws_route53_record.acm]
  certificate_arn         = aws_acm_certificate.api.arn
  validation_record_fqdns = [for record in aws_route53_record.acm : record.fqdn]
}
