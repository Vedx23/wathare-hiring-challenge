const express = require("express");
const router = express.Router();

const frequencies = ["seconds", "minutes", "hours"];

router.get("/", function(req, res,){
    res.status(200).send(frequencies);
})

module.exports = router;