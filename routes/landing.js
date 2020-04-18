const express = require("express");
const router = express.Router();

// @route GET uk/
// @desc Landing page
// @access Public
router.get("/", (req, res) => res.send("UK landing page"));

module.exports = router;
