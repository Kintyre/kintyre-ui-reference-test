# kintyre_web_ui_reference

[![Codeship Status for Kintyre/kintyre_web_ui_reference](https://app.codeship.com/projects/d6beb376-f5d4-4b78-af41-c8d477cbdc41/status?branch=master)](https://app.codeship.com/projects/416069)

This repository comprises a client ui to accompany [Kintyre's reference API](https://github.com/Kintyre/kintyre_api_reference).

## REQUIREMENTS
        
- [Node > v12 (and NPM > v6)](https://nodejs.org/en/download/)

- access to an AWS account, an AWS profile, and the AWS CLI

- (optional) a successful execution of [quail-hollow](https://github.com/Kintyre/quail-hollow)

- a successful execution of [Kintyre-runway-infrastructure](https://github.com/Kintyre/kintyre-runway-infrastructure)

- a working deployment of a [Kintyre-api-reference](https://github.com/Kintyre/kintyre_api_reference)

- access to the kintyre_web_ui [Codeship project](https://app.codeship.com/projects/416069)

## INSTALLATION

```bash
git clone https://github.com/Kintyre/kintyre_web_ui_reference.git
cd kintyre_web_ui_reference
npm install
```

## CONFIGURATION

This app uses Create-React-App's [environmental variable conventions](https://create-react-app.dev/docs/adding-custom-environment-variables/).

Create a `.env.development` and `.env.production` file in the root directory with these secrets found in the API Gateway console:

- log in to Kintyre's dev AWS account and go to API Gateway / main-kintyre-api-reference API

- go to main-kintyre-api-reference API / API / Dashboard to find the API URL.

- go to main-kintyre-api-reference API / API Keys / kintyreAPIReferenceKey for the key string.

Add the variables to the .env files like this:

```bash
# API
REACT_APP_API_URL="XXX"

# KEYS
REACT_APP_API_KEY="XXX"
```

## DEPLOYMENT

### Run it locally

This will consume `.env.development`:

```bash
npm start
```

Then open <http://localhost:3000> in a browser.

### Host it on an AWS S3

Run the build script to create a build directory:

```bash
npm run build
```

Note: this will consume `.env.production`.

For this example, I am using:

- aws profile: `kintyreAB-dev`

- s3 bucket name: `kintyre-web-ui-reference`

First create an S3 bucket in your chosen IAM user's AWS account.

```bash
aws s3 mb s3://kintyre-web-ui-reference --profile=kintyreAB-dev
```

Give it public access and set up the bucket to host a website with `index.html` as the index page AND the error page.

```bash
aws s3 website s3://kintyre-web-ui-reference --index-document index.html --error-document index.html --profile=kintyreAB-dev
```

Then sync the build directory and attach a public read policy:

```bash
aws s3 sync build s3://kintyre-web-ui-reference --acl public-read --profile=kintyreAB-dev
```

Take note of the bucket public URL. It will be something like: <http://kintyre-web-ui-reference.s3-website-us-east-1.amazonaws.com>

### Serve the reference ui over https on AWS

Consider these guides:

- <https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/>

- <https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-https-requests-s3/>

## CI/CD

Create a project on [Codeship](https://app.codeship.com). The [current project](https://app.codeship.com/projects/416069) follows a simple master / development branching strategy. Refer to the scripts in `/scripts` as a guide.

## CONTRIBUTION

Refer to the [Material-UI docs](https://material-ui.com/getting-started/installation/).

You can also refer to the [Devias Kit live preview](https://material-ui.com/store/previews/devias-kit/).

This project uses [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).
