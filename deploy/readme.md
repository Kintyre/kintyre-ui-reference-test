# Terraform Frontend Infrastructure Template

This project creates a basic infrastructure for a static site to be hosted in S3 and delivered via CloudFront.

Modified from Rangle.io's post, [Hosting a Frontend Application in AWS with Terraform](https://rangle.io/blog/frontend-app-in-aws-with-terraform/)

## Requirements

1. a `terraform.tfvars` with the values to:

```bash
project_key         = "kintyre-reference-app-deployment"
aws_region          = "us-east-1"
s3_bucket_name      = "kintyre-reference-app-deployment"
s3_bucket_env       = "development"
domain              = "dev.kintyre.net"
subdomain           = "reference-app"
hosted_zone         = "reference-app.dev.kintyre.net"
```

## Getting Started

1. run `terraform init`
2. run `terraform plan -var aws_profile=XXX` and review the plan
3. run `terraform apply -var aws_profile=XXX`

## Teardown

1. delete the `build` directory
2. run `terraform destroy -var aws_profile=XXX`
