const companyModel = require('../models/company.model');

const find = (req, res) => {
  const name = req.query.name || '';
  companyModel.find({ name: { $regex: '.*' + name + ".*", $options: 'i' } }, { _id: 0, name: 1 })
    .then((result) => {
      res.status(200).json(result);
    }).catch(error => res.status(500).json({ error }));
};

module.exports = { find };