# Changelog

## [Unreleased]

## [2.0.0]

### Changed

- Migrated from the preview Comms Passkeys API to the [Verify Passkeys API](https://www.twilio.com/docs/verify/quickstarts/passkeys).
- Calls now go through the Twilio Node helper library (`context.getTwilioClient().verify.v2`) instead of raw `axios` requests. `axios` is no longer a dependency and `twilio` is bumped to `^5.12.0`, the first release shipping the passkeys resources.

### Added

- `/registration/service` endpoint to create the passkeys enabled Verify Service and return its `SERVICE_SID`.
- `/.well-known/webauthn` endpoint serving the allowed origins for related origin requests.
- CORS headers on the passkeys endpoints so the mobile SDKs can call them.

### Removed

- `API_URL` and `ANDROID_APP_KEYS` environment variables. The helper library resolves the API URL, and extra origins now live in `assets/origins.js`.

## [1.0.0]
### Added
- Initial release.

