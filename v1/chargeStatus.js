const axios = require("axios");

module.exports.index = async (event) => {
  let req = JSON.parse(event.body);
  console.log(req);

  var data = "";

  var config = {
    method: "get",
    url: "https://account.chargeplacescotland.org/api/v1/session-status?_format=json",
    headers: {
      "api-auth":
        "c3VwcG9ydCtjcHNhcHBAdmVyc2FudHVzLmNvLnVrOmt5YlRYJkZPJCEzcVBOJHlhMVgj",
      Authorization: `Bearer ${req.token}`,
      "emp-session-id": req.emp_session_id,
    },
    data: data,
  };

  try {
    let statusReq = await axios(config);

    return {
      statusCode: 200,
      body: JSON.stringify(statusReq.data),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
