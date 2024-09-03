# passkeys-backend

Verify enables developers to easily add the Passkeys functionality into their existing authentication flows or add this backend as service to comunicate with the twilio  Verify Passkesy API, similar to Verify TOTP and Push. The Verify API supports passkey registration, public key storage, and auth flows. On the client-side, developers can optionally embed an open-source library (SDK) that handles interactions with operating systems and customizable UI widgets that maximize conversion.

## How to use the template

The best way to use the Function templates is through the Twilio CLI, you can follow [this documentation](https://www.twilio.com/docs/twilio-cli/quickstart) to install it and if you want more details for the serverless functionaity you can [check out this docs](https://www.twilio.com/docs/labs/serverless-toolkit/general-usage).

If you'd like to use the template without the Twilio CLI, [check out our usage docs](../docs/USING_FUNCTIONS.md).

Make sure before you use the template you have to set up your enviroment variables and 
customize the associated files with your client applications origins you can find this 
customization [here](#service-customization).

## Pre-requisites

### Environment variables

This project requires some environment variables to be set. A file named `.env` is used to store the values for those environment variables. To keep your tokens and secrets secure, make sure to not commit the `.env` file in git. When setting up the project with `twilio serverless:init ...` the Twilio CLI will create a `.gitignore` file that excludes `.env` from the version history.

- Enable ACCOUNT_SID and AUTH_TOKEN in your functions configuration (https://www.twilio.com/console/functions/configure)

You can find a `.env.example` file to copy for creating your own `.env` file

In your `.env` file, set the following values (please check the [details](#variable-details) of some of this variables after):

| Variable | Description | Required |
| :------- | :---------- | :------- |
| API_URL | Twilio Passkeys API to point at | yes |
| RP_DOMAIN | The main relying party domain of the client apps | yes
| ORIGINS | All the URLs from the apps that will be communicating with this backend | yes
| ANDROID_APP_KEYS | The domain of the adroid identity providers hash | no |
| ACCOUNT_SID | Twilio account where the service belong | yes |
| AUTH_TOKEN | Authentication token for twilio account | yes |

### Variables details

#### RP_DOMAIN

For the `RP_DOMAIN` variable, make sure this correspond to the main domain you are using for your apps, in the case of web applications will always be the domain that host your main page in the following format: `example.com`.

For mobile apps the `RP_DOMAIN` will be the domain that host this backend, if you are using ngrok or a similar tool, the format could be `example.ngrok.app`.

In case of using this backend for both platforms, web and mobile, you should keep into account that the `RP_DOMAIN` is going to be always the domain that host your backend and your web applications should be under this same domain or in a sub domain of this one, for more details check out the [documentation of W3C](https://www.w3.org/TR/webauthn-2/#determines-the-set-of-origins-on-which-the-public-key-credential-may-be-exercised) related to Relying Partys.

#### ORIGINS

For the `ORIGINS` variable, this will be corresponding to all the URL origins from the apps that will be pointing to this backend and should follow the full URL format, like this: `https://example.com`.

If there is more than one, should be separated by commas whithout spaces, those URLS should be in the same domain of the `RP_DOMAIN` variable or be a sub domain of that.

If you are using ngrok, we recommend follow this [docs](https://ngrok.com/docs/guides/how-to-set-up-a-custom-domain/#create-hostname-within-ngrok-dashboard) for setting up custom domains and sub domains.

### Service customization

Besides the enviroment variables files, the project also contain two files called `assetlink.json` and `apple-app-site-association` inside `./assets/.well-known/`, that is a public file that contains the identificators for the apps that will be connecting the service.

`apple-app-site-association` contains identificator hash for the origin app in iOS:

| Variable | Description | Required |
| :------- | :---------- | :------- |
| ORIGIN_IOS_APP_HASH | Replace it with the identificator of the iOS app | yes |

This variable should follow the format of the [Supporting associated domains](https://developer.apple.com/documentation/xcode/supporting-associated-domains) from Apple.

`assetlink.json` contains identificator hash for the origin apps in android and web:

| Variable | Description | Required |
| :------- | :---------- | :------- |
| RELYING_PARTY | Replace it with the value of the RP_DOMAIN varible in a full URL format | yes |
| FINGERPRINT_CERTIFICATION_HASH | Replace it with the hash fingerprint given by android app in format SHA256 | yes |


### Function Parameters

`/registration/start` expects the following parameters:

| Parameter | Description | Required |
| :-------- | :---------- | :------- |
| username | user identification name | yes


`/registration/verification` expects the following parameters:

| Parameter | Description | Required |
| :-------- | :---------- | :------- |
| id | A base64url encoded representation of `rawId`. | yes |
| rawId | The globally unique identifier for this `PublicKeyCredential`. | yes |
| attestationObject | A base64url encoded object given by the `AuthenticatorAttestationResponse` | yes |
| clientDataJSON | A base64url encoded object given by the `AuthenticatorAttestationResponse` | yes |
| transports | An Array with the transport methods given by the `AuthenticatorAttestationResponse` | yes |


`/authentication/start` a GET request, does not expect parameters

`/authentication/verification` expects the following parameters:

| Parameter | Description | Required |
| :-------- | :---------- | :------- |
| id | A base64url encoded representation of `rawId`. | yes |
| rawId | The globally unique identifier for this `PublicKeyCredential`. | yes |
| authenticatorData | A base64url encoded object given by the `AuthenticatorAttestationResponse` | yes |
| clientDataJSON | A base64url encoded object given by the `AuthenticatorAttestationResponse` | yes |
| signature | A base64url encoded object given by the `AuthenticatorAttestationResponse` | yes |
| userHandle | A base64url encoded object given by the `AuthenticatorAttestationResponse` | yes |

## Deploying

Deploy your functions and assets with either of the following commands. Note: you must run these commands from inside your project folder. [More details in the docs.](https://www.twilio.com/docs/labs/serverless-toolkit)

With the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart):

```
twilio serverless:deploy
```
