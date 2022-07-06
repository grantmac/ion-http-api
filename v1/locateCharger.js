const algoliasearch = require("algoliasearch");

module.exports.index = async (event) => {
  let req = JSON.parse(event.body);

  const client = algoliasearch(
    "ONNNBDYVAZ",
    "b0865bbd3446ba6b8b781e35d6ba405e"
  );
  const index = client.initIndex("cps_chargers");

  let results = await index.search("", {
    aroundLatLng: "55.8587358, -4.2492032",
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
