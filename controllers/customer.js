const { createToken, parseToken } = require('../libs/auth');
const { Customer } = require('../models');

module.exports = {
  signUp: async (req, res) => {
    try {
      const findEmail = await Customer.findOne({ where: { email: req.body.email } });
      if (!findEmail) {
        const result = await Customer.create({
          name: req.body.name,
          email: req.body.email,
          telp: req.body.telp,
          password: req.body.password,
          gender: req.body.gender,
          dob: req.body.dob
        });
        res.status(201).send(result);
      } else {
        res.status(200).json({
          errors: [
            {
              value: req.body.email,
              msg: 'Email already in use',
              param: 'email',
              location: 'body'
            }
          ]
        });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  signIn: async (req, res) => {
    try {
      const result = await Customer.findOne({ where: { email: req.body.email } });
      if (!result) {
        res.status(200).json({
          errors: [
            {
              value: req.body.email,
              msg: 'Email not registered',
              param: 'email',
              location: 'body'
            }
          ]
        });
      } else if (!result.validPassword(req.body.password)) {
        res.status(200).json({
          errors: [
            {
              msg: 'Password not match',
              param: 'password',
              location: 'body'
            }
          ]
        });
      } else {
        res.status(200).json({
          token: createToken({
            sessionData: result.dataValues,
            maxAge: 3600 // 1 hour
          })
        });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await Customer.findAll();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  me: (req, res) => {
    try {
      const token = parseToken(req.header('Authorization').replace('Bearer ', ''));
      res.status(200).send(token.data);
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
