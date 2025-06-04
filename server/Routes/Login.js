const express = require("express");
const router = express.Router();
const { addLogin, getLoginById, getAllLogin, updateLogin, deleteLogin } = require("../Controller/Login.js");

router.post("/user", addLogin);
router.get("/get/:id",getLoginById);
router.get("/getall", getAllLogin);
router.patch("/update/:id", updateLogin);
router.delete("/delete/:id", deleteLogin);

module.exports = router;
