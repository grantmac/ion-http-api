const axios = require("axios");
const okChargers = require("./my.json");

let okFullArr = [];
const go = async () => {
  let chargers = await axios.get(
    "https://account.chargeplacescotland.org/api/v3/poi/chargepoint/static",
    {
      headers: {
        "api-auth":
          "c3VwcG9ydCtjcHNhcHBAdmVyc2FudHVzLmNvLnVrOmt5YlRYJkZPJCEzcVBOJHlhMVgj",
      },
    }
  );

  //   console.log(chargers.data.features[0].properties.siteID);

  okChargers.forEach((okCharger) => {
    var result = chargers.data.features.filter((obj) => {
      return obj.properties.siteID === okCharger.chargePoint.siteID;
    });
    if (result[0]) {
      result[0].geometry.coordinates[0] = parseFloat(
        result[0].geometry.coordinates[0]
      );
      result[0].geometry.coordinates[1] = parseFloat(
        result[0].geometry.coordinates[1]
      );
      console.log(result[0]);

      result[0]._geoloc = {
        lat: parseFloat(result[0].geometry.coordinates[0]),
        lng: parseFloat(result[0].geometry.coordinates[1]),
      };
      okFullArr.push(result[0]);
    }
  });

  console.log(chargers.data.features.length);
  console.log(okFullArr.length);

  require("fs").writeFile(
    "./okChargers.json",

    JSON.stringify(okFullArr),

    function (err) {
      if (err) {
        console.error("Crap happens");
      }
    }
  );
};

go();
