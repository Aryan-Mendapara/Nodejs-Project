const express = require("express");
const auth = require("../Middleware/auth");
const roleCheck = require("../Middleware/roleCheck");
const router = express.Router();

router.get("/admin", auth, roleCheck(["admin"]), (req, res) =>
    res.json({ message: "Welcome to the admin dashboard" })
);


module.exports = router