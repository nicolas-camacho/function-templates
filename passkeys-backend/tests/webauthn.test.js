const helpers = require('../../test/test-helper');

const mockContext = {
  DOMAIN_NAME: 'example.com',
};

describe('.well-known/webauthn', () => {
  beforeAll(() => {
    const runtime = new helpers.MockRuntime();
    runtime._addAsset('/origins.js', '../assets/origins.private.js');
    helpers.setup(mockContext, runtime);
    handlerFunction = require('../functions/.well-known/webauthn').handler;
  });
  afterAll(() => {
    helpers.teardown();
  });

  it('lists the allowed origins for the relying party', (done) => {
    const callback = (_, { _body }) => {
      expect(_body).toEqual({
        origins: ['https://example.com', 'android:apk-key-hash:{base64_hash}'],
      });
      done();
    };

    handlerFunction(mockContext, {}, callback);
  });
});
