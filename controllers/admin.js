const { createToken, parseToken } = require('../libs/auth');
const { Admin } = require('../models');

module.exports = {
  signUp: async (req, res) => {
    try {
      const findUsername = await Admin.findOne({ where: { username: req.body.username } });
      if (!findUsername) {
        const result = await Admin.create({
          name: req.body.name,
          username: req.body.username,
          password: req.body.password
        });
        res.status(201).send(result);
      } else {
        res.status(200).json({
          errors: [
            {
              value: req.body.username,
              msg: 'Username already in use',
              param: 'username',
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
      const result = await Admin.findOne({ where: { username: req.body.username } });
      if (!result) {
        res.status(200).json({
          errors: [
            {
              value: req.body.username,
              msg: 'Username not registered',
              param: 'username',
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
      const result = await Admin.findAll();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      const result = await Admin.destroy({ where: { id: req.params.id } });
      if (result === 0) {
        res.status(200).json({
          errors: [
            {
              value: req.params.id,
              msg: 'id not found',
              param: 'id',
              location: 'params'
            }
          ]
        });
      } else {
        res.status(200).json({
          success: true,
          msg: `admin ${req.params.id} deleted`
        });
      }
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
