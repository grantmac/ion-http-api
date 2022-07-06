const axios = require("axios");

module.exports.index = async (event) => {
  let req = JSON.parse(event.body);

  if (!req.username) {
    return {
      statusCode: 401,
      body: "no username",
    };
  }

  var data = `{"action":"START","chargepoint":"${req.chargepoint}","connector":"${req.connector}","transaction_type":"NEW","emp_session_id":""}`;

  var config = {
    method: "post",
    url: "https://account.chargeplacescotland.org/api/v1/startstop?_format=json",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "ChargePlace%20Scotland/3.1.3 CFNetwork/1383 Darwin/22.0.0",
      "Content-Length": "101",
      Accept: "application/json, text/plain, */*",
      Connection: "keep-alive",
      "Accept-Language": "en-gb",
      "api-auth":
        "c3VwcG9ydCtjcHNhcHBAdmVyc2FudHVzLmNvLnVrOmt5YlRYJkZPJCEzcVBOJHlhMVgj",
      Authorization: `Bearer ${req.token}`,
    },
    data: data,
  };

  try {
    let startReq = await axios(config);

    return {
      statusCode: 200,
      body: JSON.stringify(startReq.data),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: e.response.status,
      body: JSON.stringify(e.response.data),
    };
  }
};
