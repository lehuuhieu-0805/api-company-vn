const express = require('express');
const router = express.Router();

const companyV1Controller = require('../controllers/company.v1.controller');

router.get('/', (req, res) => {
  companyV1Controller.find(req, res);
});

// router.post('/', (req, res) => {
//   companyV1Controller.create(req, res);
// });

module.exports = router;