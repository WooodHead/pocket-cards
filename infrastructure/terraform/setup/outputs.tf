# ----------------------------------------------------------------------------------------------
# Project Name
# ----------------------------------------------------------------------------------------------
output "project_name" {
  value = var.project_name
}

# ----------------------------------------------------------------------------------------------
# Project Name UC
# ----------------------------------------------------------------------------------------------
output "project_name_uc" {
  value = local.project_name_uc
}

# ----------------------------------------------------------------------------------------------
# S3 Bucket
# ----------------------------------------------------------------------------------------------
output "bucket_name_frontend" {
  value = aws_s3_bucket.frontend.id
}
output "bucket_name_archive" {
  value = aws_s3_bucket.archive.id
}
output "bucket_name_materials" {
  value = aws_s3_bucket.materials.id
}

# ----------------------------------------------------------------------------------------------
# DynamoDB
# ----------------------------------------------------------------------------------------------
output "dynamodb_name_users" {
  value = aws_dynamodb_table.users.name
}
output "dynamodb_name_groups" {
  value = aws_dynamodb_table.groups.name
}
output "dynamodb_name_words" {
  value = aws_dynamodb_table.words.name
}
output "dynamodb_name_word_master" {
  value = aws_dynamodb_table.word_master.name
}
output "dynamodb_name_word_ignore" {
  value = aws_dynamodb_table.word_ignore.name
}
output "dynamodb_name_histories" {
  value = aws_dynamodb_table.histories.name
}
output "dynamodb_name_questions" {
  value = aws_dynamodb_table.questions.name
}
output "dynamodb_name_learning" {
  value = aws_dynamodb_table.learning.name
}
output "dynamodb_name_traces" {
  value = aws_dynamodb_table.traces.name
}
# ----------------------------------------------------------------------------------------------
# Route53 DNS Servers
# ----------------------------------------------------------------------------------------------
output "dns_name_servers" {
  sensitive = true
  value     = aws_route53_zone.this.name_servers
}

# ----------------------------------------------------------------------------------------------
# Domain Name
# ----------------------------------------------------------------------------------------------
output "route53_zone_name" {
  sensitive = true
  value     = aws_route53_zone.this.name
}

# ----------------------------------------------------------------------------------------------
# Google Client ID
# ----------------------------------------------------------------------------------------------
output "google_client_id" {
  sensitive = true
  value     = var.google_client_id
}

# ----------------------------------------------------------------------------------------------
# Google Client Secret
# ----------------------------------------------------------------------------------------------
output "google_client_secret" {
  sensitive = true
  value     = var.google_client_secret
}

# ----------------------------------------------------------------------------------------------
# IPA API URL
# ----------------------------------------------------------------------------------------------
output "ssm_ipa_api_url" {
  value = aws_ssm_parameter.ipa_api_url.name
}

# ----------------------------------------------------------------------------------------------
# IPA API Key
# ----------------------------------------------------------------------------------------------
output "ssm_ipa_api_key" {
  value = aws_ssm_parameter.ipa_api_key.name
}

# ----------------------------------------------------------------------------------------------
# Translation API URL
# ----------------------------------------------------------------------------------------------
output "ssm_translation_api_url" {
  value = aws_ssm_parameter.translation_api_url.name
}

# ----------------------------------------------------------------------------------------------
# Translation API Key
# ----------------------------------------------------------------------------------------------
output "ssm_translation_api_key" {
  value = aws_ssm_parameter.translation_api_key.name
}

# ----------------------------------------------------------------------------------------------
# Vision API URL
# ----------------------------------------------------------------------------------------------
output "ssm_vision_api_url" {
  value = aws_ssm_parameter.vision_api_url.name
}

# ----------------------------------------------------------------------------------------------
# Vision API Key
# ----------------------------------------------------------------------------------------------
output "ssm_vision_api_key" {
  value = aws_ssm_parameter.vision_api_key.name
}
