# Terraform Frontend Infrastructure Template

This project creates a basic infrastructure for a static site to be hosted in S3 and delivered via CloudFront.

Modified from Kristi Kristo's post, [Deployment of React.JS, using AWS S3, CircleCI and Terraform.](https://medium.com/softup-technologies/deployment-of-react-js-using-aws-s3-circleci-and-terraform-e75961c0df86)

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
