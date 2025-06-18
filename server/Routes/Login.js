const express = require("express");
const router = express.Router();
const { addLogin, getLoginById, getAllLogin, updateLogin, deleteLogin, addRagister } = require("../Controller/Login.js");
const auth = require("../Middleware/auth.js");
const roleCheck = require("../Middleware/roleCheck.js");
const verifyOTP = require('../Controller/varifyOtp.js')

router.post("/user/login", addLogin);
router.get("/get/:id", getLoginById);
router.get("/getall", getAllLogin);
router.patch("/update/:id", updateLogin);
router.delete("/delete/:id", deleteLogin);
router.post("/user/register", addRagister)
router.post("/verify-otp", verifyOTP);

// router.get("/admin", auth, roleCheck((req, res) => {
//     res.send("Hello Admin");
// }))
    // res.send({ message: "Welcome to the admin" }))


module.exports = router;
