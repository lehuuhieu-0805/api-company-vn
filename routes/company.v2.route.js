const express = require('express');
const router = express.Router();

const companyV2Controller = require('../controllers/company.v2.controller');

router.get('/', (req, res) => {
  companyV2Controller.find(req, res);
});

module.exports = router;