require("dotenv").config();
const express = require("express");

const dbConnection = require("./DBConnection/Connection");
const index = require("./Routes/main");
// const {addUser, getUserById, getAllUsers, updateUser, deleteUser} = require("./Controller/User");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use("/v1",index);

dbConnection();

app.listen(port, () => {
    console.log("Server start ", port);
})
