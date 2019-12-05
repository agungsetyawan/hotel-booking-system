const { createToken } = require('../libs/auth');
const { Admin } = require('../models');

module.exports = {
  signUp: async (req, res) => {
    try {
      const result = await Admin.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
      });
      res.status(201).send(result);
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
      const result = await Admin.destroy({ where: { id: req.body.id } });
      if (result === 0) {
        res.status(200).json({
          errors: [
            {
              value: req.body.id,
              msg: 'id not found',
              param: 'id',
              location: 'body'
            }
          ]
        });
      } else {
        res.status(200).json({
          success: true,
          msg: `admin ${req.body.id} deleted`
        });
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  findByUsername: async value => {
    try {
      return await Admin.findOne({ where: { username: value } });
    } catch (error) {
      throw new Error(error);
    }
  }
};
