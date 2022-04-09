# ----------------------------------------------------------------------------------------------
# VPC ID
# ----------------------------------------------------------------------------------------------
variable "vpc_id" {
  default = "vpc-08f77b07c34029b7a"
}

# ----------------------------------------------------------------------------------------------
# Subnets
# ----------------------------------------------------------------------------------------------
variable "vpc_subnets" {
  type    = list(string)
  default = ["subnet-003cfdcdbaf257d95", "subnet-0221940ce594a9f84"]
}

# ----------------------------------------------------------------------------------------------
# System Admin Email
# ----------------------------------------------------------------------------------------------
variable "admin_email" {
}

# ----------------------------------------------------------------------------------------------
# Webhook URL
# ----------------------------------------------------------------------------------------------
variable "webhook_url" {
}
