const express = require("express");
const router = express.Router();

// @route GET uk/court-order
// @desc Court Order calculator
// @access Public
router.get("/", (req, res) => res.send("Court Order route"));

module.exports = router;
