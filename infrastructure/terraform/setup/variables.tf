# ----------------------------------------------------------------------------------------------
# Project Name
# ----------------------------------------------------------------------------------------------
variable "project_name" {
  default = "pkc"
}

# ----------------------------------------------------------------------------------------------------------------------
# Domain Name
# ----------------------------------------------------------------------------------------------------------------------
variable "domain_name" {}

# ----------------------------------------------------------------------------------------------
# API Key Translation
# ----------------------------------------------------------------------------------------------
variable "api_key_translation" {
  sensitive = true
}

# ----------------------------------------------------------------------------------------------
# API Key IPA
# ----------------------------------------------------------------------------------------------
variable "api_key_ipa" {
  sensitive = true
}

# ----------------------------------------------------------------------------------------------
# Google Client ID
# ----------------------------------------------------------------------------------------------
variable "google_client_id" {
  sensitive = true
}

# ----------------------------------------------------------------------------------------------
# Google Client Secret
# ----------------------------------------------------------------------------------------------
variable "google_client_secret" {
  sensitive = true
}
