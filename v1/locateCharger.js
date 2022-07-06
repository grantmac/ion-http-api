const algoliasearch = require("algoliasearch");

module.exports.index = async (event) => {
  const client = algoliasearch(
    "ONNNBDYVAZ",
    "b0865bbd3446ba6b8b781e35d6ba405e"
  );
  const index = client.initIndex("cps_chargers");

  let results = await index.search("", {
    aroundLatLng: `${event.queryStringParameters.lat}, ${event.queryStringParameters.lng}`,
    aroundRadius: 55,
  });

  let res = results.hits.map((result) => {
    return {
      ...result.properties.address,
      siteID: result.properties.siteID,
    };
  });

  try {
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    console.log(e);
  }
};
