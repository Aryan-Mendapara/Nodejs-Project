const express = require("express");
const {addRagister, getRagister, updateRagister, deleteRagister} = require("../Controller/Ragister")
const ragisters = express.Router();

ragisters.post("/post",addRagister);
ragisters.get("/get",getRagister);
ragisters.patch("/update/:id",updateRagister);
ragisters.delete("/delete/:id",deleteRagister);

module.exports = ragisters