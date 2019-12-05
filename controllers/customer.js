const { createToken } = require('../libs/auth');
const { Customer } = require('../models');

module.exports = {
  signUp: (req, res) => {
    Customer.create({
      name: req.body.name,
      email: req.body.email,
      telp: req.body.telp,
      password: req.body.password,
      gender: req.body.gender,
      dob: req.body.dob
    })
      .then(result => {
        res.status(201).send(result);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  signIn: (req, res) => {
    Customer.findOne({ where: { email: req.body.email } })
      .then(customer => {
        if (!customer) {
          res.status(200).json({ errors: 'email not registered' });
        } else if (!customer.validPassword(req.body.password)) {
          res.status(200).json({ errors: 'wrong password' });
        } else {
          res.status(200).json({
            token: createToken({
              sessionData: customer.dataValues,
              maxAge: 3600 // 1 hour
            })
          });
        }
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  getAll: (req, res) => {
    Customer.findAll()
      .then(customer => {
        res.status(200).send(customer);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
};
