const axios = require("axios");

module.exports.index = async (event) => {
  var data =
    "grant_type=password&client_id=478fb1ba-798d-4e33-ba47-8b24f0f2d30b&client_secret=tzU9LCR6lR4r!nDvJ*bYY%40AcZBkc%5EStXlchV&username=grant.maclennan%40gmail.com&password=treA547d";

  var config = {
    method: "post",
    url: "https://account.chargeplacescotland.org/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "ChargePlace%20Scotland/3.1.3 CFNetwork/1383 Darwin/22.0.0",
      "Content-Length": "176",
      Accept: "application/json, text/plain, */*",
      Connection: "keep-alive",
      "Accept-Language": "en-gb",
    },
    data: data,
  };

  try {
    let tokenReq = await axios(config);

    return {
      statusCode: 200,
      body: JSON.stringify({
        access_token: tokenReq.data.access_token,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
