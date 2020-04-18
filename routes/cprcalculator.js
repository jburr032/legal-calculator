const express = require("express");
const router = express.Router();

// @route GET uk/cpr
// @desc CPR calculator
// @access Public
router.get("/", (req, res) => res.send("CPR route"));

module.exports = router;
