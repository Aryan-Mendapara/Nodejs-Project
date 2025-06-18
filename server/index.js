require("dotenv").config();
const express = require("express");
const cors = require("cors")

const dbConnection = require("./DBConnection/Connection");
const index = require("./Routes/main");
const { CronJob } = require("cron");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // React frontend
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

// app.setCron = new CronJob("* * * * * *", function () {
//     console.log("Cron Job executed at", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
// },
//   null,
//   true, // auto-start
//   "Asia/Kolkata" // set timezone
// )
// app.setCron.start();
// [Asia/Kolkata] 
app.use("/v1",index);

dbConnection();

app.listen(port, () => {
  console.log("Server start ", port);
})
