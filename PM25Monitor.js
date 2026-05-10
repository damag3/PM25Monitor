Module.register("PM25Monitor", {
  defaults: {
    esp8266_ip: "http://192.168.1.X",  // IP do seu ESP
    updateInterval: 10000,
  },

  getStyles: function() {
    return ["PM25Monitor.css"];
  },
  

  start: function() {
    this.pm25 = "--";
    this.pm10 = "--";
    this.pm1_0 = "--";
    this.status = "loading";
    this.scheduleUpdate();
  },

  scheduleUpdate: function() {
    setInterval(() => {
      this.updateData();
    }, this.config.updateInterval);
    this.updateData();
  },

  updateData: function() {
    this.sendSocketNotification("GET_PM25", this.config.esp8266_ip);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "PM25_DATA") {
      this.pm25 = payload.pm25;
      this.pm10 = payload.pm10;
      this.pm1_0 = payload.pm1_0;
      this.status = payload.status;
      this.updateDom();
    }
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.className = "pm25-container";


    var pm25Div = document.createElement("div");
    pm25Div.className = "value " + this.getPM25Class(this.pm25);
    pm25Div.innerHTML = "PM2.5: " + this.pm25 + " µg/m³";
    wrapper.appendChild(pm25Div);

    var pm10Div = document.createElement("div");
    pm10Div.className = "subvalue";
    pm10Div.innerHTML = "PM10: " + this.pm10 + " µg/m³";
    wrapper.appendChild(pm10Div);

    var pm1Div = document.createElement("div");
    pm1Div.className = "subvalue";
    pm1Div.innerHTML = "PM1.0: " + this.pm1_0 + " µg/m³";
    wrapper.appendChild(pm1Div);

    return wrapper;
  },

  getPM25Class: function(value) {
    if (value <= 12) return "good";
    if (value <= 35) return "moderate";
    return "bad";
  }
});
