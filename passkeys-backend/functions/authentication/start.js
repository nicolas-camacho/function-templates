const axios = require('axios');

// eslint-disable-next-line consistent-return
exports.handler = async (context, _, callback) => {
  const { RP_DOMAIN, API_URL } = context;

  const response = new Twilio.Response();
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { username, password } = context.getTwilioClient();

  const requestBody = {
    content: {
      // eslint-disable-next-line camelcase
      rp_id: RP_DOMAIN,
    },
  };

  const challengeURL = `${API_URL}/Verifications`;

  try {
    const APIResponse = await axios.post(challengeURL, requestBody, {
      auth: {
        username,
        password,
      },
    });

    response.setStatusCode(200);
    response.setBody(APIResponse.data.next_step);
  } catch (error) {
    const statusCode = error.status || 400;
    response.setStatusCode(statusCode);
    response.setBody(error.message);
  }

  return callback(null, response);
};
