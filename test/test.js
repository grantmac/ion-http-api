const data = require("./chargers.js");

console.log(data.chargers.chargePoints.length);
let aval = [];
data.chargers.chargePoints.map((charger) => {
  let ok = true;

  if (charger.chargePoint.name == "51067") {
    console.log(JSON.stringify(charger.chargePoint.connectorGroups));
  }

  charger.chargePoint.connectorGroups.map((chargeG) => {
    let status = chargeG.connectors[0].connectorStatus;
    if (status === "UNKNOWN" || status === "UNAVAILABLE") {
      ok = false;
    }
  });

  if (ok) {
    aval.push(charger);
  }
});

require("fs").writeFile(
  "./my.json",

  JSON.stringify(aval),

  function (err) {
    if (err) {
      console.error("Crap happens");
    }
  }
);

// console.log(aval[1010]);

// console.log(data.chargers.chargePoints[500].chargePoint.connectorGroups);
