const express = require("express");
const router = express.Router();
const { calcurateCostFor10Days } = require("../controllers/job");

router.get("/calcurateCostFor10Days", calcurateCostFor10Days);

module.exports = router;