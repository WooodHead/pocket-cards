# ----------------------------------------------------------------------------------------------
# Backend Service Environment file
# ----------------------------------------------------------------------------------------------
resource "aws_s3_object" "resources" {
  bucket  = local.bucket_name_archive
  key     = local.ecs_service_env_key_backend
  content = <<EOT
AWS_DEFAULT_REGION=ap-northeast-1
IPA_API_URL=${data.aws_ssm_parameter.ipa_api_url.value}
IPA_API_KEY=${data.aws_ssm_parameter.ipa_api_key.value}
TRANSLATION_API_URL=${data.aws_ssm_parameter.translation_api_url.value}
TRANSLATION_API_KEY=${data.aws_ssm_parameter.translation_api_key.value}
VISION_API_URL=${data.aws_ssm_parameter.vision_api_url.value}
VISION_API_KEY=${data.aws_ssm_parameter.vision_api_key.value}
TABLE_NAME_USERS=${local.dynamodb_name_users}
TABLE_NAME_GROUPS=${local.dynamodb_name_groups}
TABLE_NAME_WORDS=${local.dynamodb_name_words}
TABLE_NAME_WORD_MASTER=${local.dynamodb_name_word_master}
TABLE_NAME_WORD_IGNORE=${local.dynamodb_name_word_ignore}
TABLE_NAME_HISTORIES=${local.dynamodb_name_histories}
TABLE_NAME_QUESTIONS=${local.dynamodb_name_questions}
TABLE_NAME_LEARNING=${local.dynamodb_name_learning}
TABLE_NAME_TRACES=${local.dynamodb_name_traces}
BUCKET_NAME_FRONTEND=${local.bucket_name_frontend}
BUCKET_NAME_MATERAILS=${local.bucket_name_materials}
PATH_PATTERN=audio
TZ=Asia/Tokyo
EOT
}

# ----------------------------------------------------------------------------------------------
# Users Service Environment file
# ----------------------------------------------------------------------------------------------
resource "aws_s3_object" "users" {
  bucket  = local.bucket_name_archive
  key     = local.ecs_service_env_key_users
  content = <<EOT
TABLE_NAME_USERS=${local.dynamodb_name_users}
TABLE_NAME_SETTINGS=${local.dynamodb_name_settings}
TZ=Asia/Tokyo
EOT
}

# ----------------------------------------------------------------------------------------------
# Auth Service Environment file
# ----------------------------------------------------------------------------------------------
resource "aws_s3_object" "auth" {
  bucket  = local.bucket_name_archive
  key     = local.ecs_service_env_key_auth
  content = <<EOT
TZ=Asia/Tokyo
TABLE_NAME_SETTINGS=${local.dynamodb_name_settings}
ENDPOINT_USERS_SERVICE=http://${local.cloudmap_service_users}.${local.cloudmap_namespace}:8080/v1
EOT
}


