# kintyre_web_ui_reference

[![Codeship Status for Kintyre/kintyre_web_ui_reference](https://app.codeship.com/projects/7f07fca0-60aa-0138-a93a-06248b2c48b8/status?branch=master)](https://app.codeship.com/projects/392637)

This repo comprises a starter client to accompany [Kintyre's reference API](https://github.com/Kintyre/kintyre_api_reference) as well as numerous components used in previous Kintyre React web apps.

## REQUIREMENTS

- [Node > v12 (and NPM > v6)](https://nodejs.org/en/download/)

- a working deployment of the [Kintyre reference API](https://github.com/Kintyre/kintyre_api_reference)

- access to the kintyre_web_ui_reference [Codeship project](https://app.codeship.com/projects/7f07fca0-60aa-0138-a93a-06248b2c48b8)

- access to an AWS account, an AWS profile, and the AWS CLI

## INSTALLATION

```bash
git clone https://github.com/Kintyre/kintyre_web_ui_reference.git
cd kintyre_web_ui_reference
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
REACT_APP_API_URL="XXX"

# KEYS
REACT_APP_EMPLOYEES_API_KEY="XXX"
```

## DEPLOYMENT

### Run it locally

This will consume .env.development:

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

#### Use the AWS CLI

For this example, I am using:

- aws profile: `kintyreAB`

- s3 bucket name: `kintyre-web-ui-reference`

First create an S3 bucket in your chosen IAM user's AWS account.

```bash
aws s3 mb s3://kintyre-web-ui-reference --profile=kintyreAB
```

Give it public access and set up the bucket to host a website with `index.html` as the index page AND the error page.

```bash
aws s3 website s3://kintyre-web-ui-reference --index-document index.html --error-document index.html --profile=kintyreAB
```

Then sync the build directory and attach a public read policy:

```bash
aws s3 sync build s3://kintyre-web-ui-reference --acl public-read --profile=kintyreAB
```

(For reference, this is what will show up in the aws console's bucket policy:)

```json
{
    "Version": "2008-10-17",
    "Id": "PolicyForPublicWebsiteContent",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::kintyre-web-ui-reference/*"
        }
    ]
}
```

Take note of the bucket public URL. It will be something like: <http://kintyre-web-ui-reference.s3-website-us-east-1.amazonaws.com>

Note: the Codeship project will also deploy the app with every push to master.

## CONTRIBUTION

Refer to the [Material-UI docs](https://material-ui.com/getting-started/installation/).

You can also refer to the [Devias Kit live preview](https://material-ui.com/store/previews/devias-kit/).