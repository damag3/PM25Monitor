const NodeHelper = require("node_helper");
const http = require("http");

module.exports = NodeHelper.create({
  socketNotificationReceived: function(notification, payload) {
    if (notification === "GET_PM25") {
      http.get(payload + "/json", (resp) => {
        let data = "";
        resp.on("data", (chunk) => { data += chunk; });
        resp.on("end", () => {
          try {
            const json = JSON.parse(data);
            this.sendSocketNotification("PM25_DATA", json);
          } catch(e) {
            this.sendSocketNotification("PM25_DATA", {pm25: "--", pm10: "--", pm1_0: "--", status: "error"});
          }
        });
      }).on("error", () => {
        this.sendSocketNotification("PM25_DATA", {pm25: "--", pm10: "--", pm1_0: "--", status: "error"});
      });
    }
  }
});
