locals {
  # ----------------------------------------------------------------------------------------------
  # Environment
  # ----------------------------------------------------------------------------------------------
  environment  = terraform.workspace
  is_dev       = local.environment == "dev"
  is_dev_count = local.is_dev ? 0 : 1
  remote_setup = data.terraform_remote_state.setup.outputs
  account_id   = data.aws_caller_identity.this.account_id
  region       = data.aws_region.this.name
  region_us    = "us-east-1"
  vpc_id       = local.is_dev ? var.vpc_id : module.vpc[0].vpc_id
  subnets      = local.is_dev ? var.subnets : module.vpc[0].public_subnets

  # ----------------------------------------------------------------------------------------------
  # Project Informations
  # ----------------------------------------------------------------------------------------------
  project_name         = local.remote_setup.project_name
  project_name_uc      = local.remote_setup.project_name_uc
  google_client_id     = local.remote_setup.google_client_id
  google_client_secret = local.remote_setup.google_client_secret

  # ----------------------------------------------------------------------------------------------
  # ECS
  # ----------------------------------------------------------------------------------------------
  task_def_family_backend = "${local.project_name}-backend"
  task_def_family_users   = "${local.project_name}-users"
  task_def_rev            = max(aws_ecs_task_definition.this.revision, data.aws_ecs_task_definition.backend.revision)
  task_def_rev_users      = max(aws_ecs_task_definition.users.revision, data.aws_ecs_task_definition.users.revision)

  # ----------------------------------------------------------------------------------------------
  # API Gateway
  # ----------------------------------------------------------------------------------------------
  api_domain_name = aws_acm_certificate.api.domain_name

  # -----------------------------------------------
  # CloudFront
  # -----------------------------------------------
  origin_id_frontend     = "frontend"
  origin_id_materials    = "materials"
  origin_id_audio        = "audio"
  origin_id_api          = "api"
  origin_id_path         = "/api"
  default_root_object    = "index.html"
  viewer_protocol_policy = "redirect-to-https"
  logging_prefix         = "frontend"
  audio_path_pattern     = local.origin_id_audio
  api_path_pattern       = local.origin_id_api

  # ----------------------------------------------------------------------------------------------
  # CloudTrail
  # ----------------------------------------------------------------------------------------------
  ct_prefix = "trail"

  # ----------------------------------------------------------------------------------------------
  # S3 Bucket
  # ----------------------------------------------------------------------------------------------
  bucket_name_frontend  = local.remote_setup.bucket_name_frontend
  bucket_name_archive   = local.remote_setup.bucket_name_archive
  bucket_name_materials = local.remote_setup.bucket_name_materials

  # ----------------------------------------------------------------------------------------------
  # Route53
  # ----------------------------------------------------------------------------------------------
  route53_zone_name = local.remote_setup.route53_zone_name
  domain_name       = local.remote_setup.route53_zone_name
}

# ----------------------------------------------------------------------------------------------
# AWS Region
# ----------------------------------------------------------------------------------------------
data "aws_region" "this" {}

# ----------------------------------------------------------------------------------------------
# AWS Account
# ----------------------------------------------------------------------------------------------
data "aws_caller_identity" "this" {}

# ----------------------------------------------------------------------------------------------
# Amazon S3 Bucket - Frontend
# ----------------------------------------------------------------------------------------------
data "aws_s3_bucket" "frontend" {
  bucket = local.bucket_name_frontend
}

# ----------------------------------------------------------------------------------------------
# Amazon S3 Bucket - Archive
# ----------------------------------------------------------------------------------------------
data "aws_s3_bucket" "archive" {
  bucket = local.bucket_name_archive
}

# ----------------------------------------------------------------------------------------------
# Amazon S3 Bucket - Materials
# ----------------------------------------------------------------------------------------------
data "aws_s3_bucket" "materials" {
  bucket = local.bucket_name_materials
}

# ----------------------------------------------------------------------------------------------
# ECS Task Definition - Backend
# ----------------------------------------------------------------------------------------------
data "aws_ecs_task_definition" "backend" {
  depends_on      = [aws_ecs_task_definition.this]
  task_definition = aws_ecs_task_definition.this.family
}

# ----------------------------------------------------------------------------------------------
# ECS Task Definition - Users
# ----------------------------------------------------------------------------------------------
data "aws_ecs_task_definition" "users" {
  depends_on      = [aws_ecs_task_definition.users]
  task_definition = aws_ecs_task_definition.users.family
}

# ----------------------------------------------------------------------------------------------
# SSM Parameter Store - Backend repository url
# ----------------------------------------------------------------------------------------------
data "aws_ssm_parameter" "backend_repo_url" {
  depends_on = [aws_ssm_parameter.backend_repo_url]
  name       = aws_ssm_parameter.backend_repo_url.name
}

# ----------------------------------------------------------------------------------------------
# AWS Route53 Zone
# ----------------------------------------------------------------------------------------------
data "aws_route53_zone" "this" {
  name = local.route53_zone_name
}


