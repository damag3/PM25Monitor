# PM25Monitor – MagicMirror² Module for ESP8266 PM2.5 Sensor

![MagicMirror](https://img.shields.io/badge/MagicMirror-Module-blue)
![Air Quality](https://img.shields.io/badge/Air%20Quality-PM2.5-green)
![ESP8266](https://img.shields.io/badge/ESP8266-Sensor-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

PM25Monitor is a MagicMirror² module that displays **real‑time PM2.5, PM10, and PM1.0 air quality data** from an ESP8266‑based sensor.

The ESP8266 must expose a JSON endpoint returning PM values.  
The module fetches the data using a Node.js helper and displays it with color‑coded air quality indicators.

---

## 📡 Requirements

Your ESP8266 must serve a JSON endpoint at:
http://<ESP_IP>/json


Code

Expected JSON format:

```json
{
  "pm25": 12,
  "pm10": 20,
  "pm1_0": 8,
  "status": "ok"
}
If the ESP is unreachable or returns invalid data, the module displays:

Code
PM2.5: --
PM10: --
PM1.0: --
````

📦 Installation
Clone the module into your MagicMirror modules directory:

````bash
cd ~/MagicMirror/modules
git clone https://github.com/YOUR_USER/PM25Monitor
No additional dependencies are required.

⚙️ Configuration
Add the module to your config.js:

js
{
    module: "PM25Monitor",
    position: "top_right",
    config: {
        esp8266_ip: "http://192.168.1.70",
        updateInterval: 10000
    }
}
````
🧠 How It Works
Frontend (PM25Monitor.js)
Requests PM data via socket notifications

Displays PM2.5, PM10, and PM1.0

Applies color coding based on PM2.5 value:

Good (≤ 12) → green

Moderate (≤ 35) → orange

Bad (> 35) → red

Backend (node_helper.js)
Performs HTTP GET request to:

Code
http://<ESP_IP>/json
Parses JSON

Sends data back to the module

Handles errors gracefully
