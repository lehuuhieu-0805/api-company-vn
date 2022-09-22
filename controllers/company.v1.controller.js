const companyModel = require('../models/company.model');

const create = (req, res) => {
  companyModel.create(req.body)
    .then((result) => {
      res.status(201).json(result);
    }).catch(error => res.status(500).json({ error }));
};

const find = (req, res) => {
  const name = req.query.name || '';
  companyModel.find({ name: { $regex: '.*' + name + ".*", $options: 'i' } }, { __v: 0 })
    .then((result) => {
      res.status(200).json(result);
    }).catch(error => res.status(500).json({ error }));
};

module.exports = { create, find };