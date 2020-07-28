# kintyre_web_ui_reference_new

[![Codeship Status for Kintyre/kintyre_web_ui_reference_new](https://app.codeship.com/projects/a16c3890-b25b-0138-71e6-3a0762daec5c/status?branch=master)](https://app.codeship.com/projects/404079)

This repo comprises a starter client to accompany [Kintyre's reference API](https://github.com/Kintyre/kintyre_api_reference) as well as numerous components used in previous Kintyre React web apps.

## REQUIREMENTS

- [Node > v12 (and NPM > v6)](https://nodejs.org/en/download/)

- a working deployment of the [Kintyre reference API](https://github.com/Kintyre/kintyre_api_reference)

- access to the kintyre_web_ui_reference_new [Codeship project](https://app.codeship.com/projects/a16c3890-b25b-0138-71e6-3a0762daec5c)

- access to an AWS account, an AWS profile, and the AWS CLI

## INSTALLATION

```bash
git clone https://github.com/Kintyre/kintyre_web_ui_reference_new.git
cd kintyre_web_ui_reference_new
npm install
```

## CONFIGURATION

This app uses Create-React-App's [env var conventions](https://create-react-app.dev/docs/adding-custom-environment-variables/).

Create a `.env.development` and `.env.production` file in the root directory with these secrets found in the API Gateway console:

- log in to Kintyre's dev AWS account and go to API Gateway / main-kintyre-api-reference API

- go to main-kintyre-api-reference API / API / Dashboard to find the API URL.

- go to main-kintyre-api-reference API / API Keys / kintyreAPIReferenceKey for the key string.

Add the variables to the .env files like this:

```bash
# API
REACT_APP_EMPLOYEE_API_URL="XXX"

# KEYS
REACT_APP_EMPLOYEE_API_KEY="XXX"
```

## DEPLOYMENT

### Run it locally

This will consume `.env.development`:

```bash
npm start
```

Then open <http://localhost:3000> in a browser.

### Run it remotely

Run the build script to create a build directory:

```bash
npm run build
```

Note: this will consume `.env.production`.

<!-- WIP --
### Deploy via Terraform

#### Terraform Frontend Infrastructure Template

This project creates a basic infrastructure for a static site to be hosted in S3 and delivered via CloudFront.

Modified from Kristi Kristo's post, [Deployment of React.JS, using AWS S3, CircleCI and Terraform.](https://medium.com/softup-technologies/deployment-of-react-js-using-aws-s3-circleci-and-terraform-e75961c0df86)

##### Requirements

1. a `deploy/terraform.tfvars` with the values to:

```bash
project_key         = "kintyre-reference-app-deployment"
aws_region          = "us-east-1"
s3_bucket_name      = "kintyre-reference-app-deployment"
s3_bucket_env       = "development"
domain              = "dev.kintyre.net"
subdomain           = "reference-app"
hosted_zone         = "reference-app.dev.kintyre.net"
```

#### Getting Started

1. run `deploy/terraform init`
2. run `deploy/terraform plan -var aws_profile=XXX` and review the plan
3. run `deploy/terraform apply -var aws_profile=XXX`

#### Teardown

1. delete the `build` directory
2. run `terraform destroy -var aws_profile=XXX`

#### SCRIPT

a simple deploy.sh script will:

1. run `npm build`
2. run `deploy/terraform init`
3. run `deploy/terraform plan -var aws_profile=XXX` and review the plan
4. run `deploy/terraform apply -var aws_profile=XXX`
5. run `aws s3 sync build <s3 bucket name from terraform output> --profile=XXX`
-->

For this example, I am using:

- aws profile: `kintyreAB`

- s3 bucket name: `kintyre-web-ui-reference-new`

First create an S3 bucket in your chosen IAM user's AWS account.

```bash
aws s3 mb s3://kintyre-web-ui-reference-new --profile=kintyreAB
```

Give it public access and set up the bucket to host a website with `index.html` as the index page AND the error page.

```bash
aws s3 website s3://kintyre-web-ui-reference-new --index-document index.html --error-document index.html --profile=kintyreAB
```

Then sync the build directory and attach a public read policy:

```bash
aws s3 sync build s3://kintyre-web-ui-reference-new --acl public-read --profile=kintyreAB
```

Take note of the bucket public URL. It will be something like: <http://kintyre-web-ui-reference-new.s3-website-us-east-1.amazonaws.com>

Note: the Codeship project will also deploy the app with every push to master.

## CONTRIBUTION

Refer to the [Material-UI docs](https://material-ui.com/getting-started/installation/).

You can also refer to the [Devias Kit live preview](https://material-ui.com/store/previews/devias-kit/).

This project uses [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).
