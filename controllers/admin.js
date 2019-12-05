const { createToken } = require('../libs/auth');
const { Admin } = require('../models');

module.exports = {
  signUp: (req, res) => {
    Admin.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    })
      .then(result => {
        res.status(201).send(result);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  signIn: (req, res) => {
    // try {
    //   const admin = await Admin.findOne({ where: { username: req.body.username } });
    //   console.log(req.body.password);
    //   console.log(admin.validPassword(req.body.password));
    //   if (!admin) {
    //     res.status(200).json({
    //       errors: [
    //         {
    //           value: req.body.username,
    //           msg: 'Username not registered',
    //           param: 'username',
    //           location: 'body'
    //         }
    //       ]
    //     });
    //   } else if (!admin.validPassword(req.body.password)) {
    //     res.status(200).json({
    //       errors: [
    //         {
    //           value: null,
    //           msg: 'Password not match',
    //           param: 'password',
    //           location: 'body'
    //         }
    //       ]
    //     });
    //   } else {
    //     res.status(200).json({
    //       token: createToken({
    //         sessionData: admin.dataValues,
    //         maxAge: 3600 // 1 hour
    //       })
    //     });
    //   }
    // } catch (error) {
    //   res.status(400).send(error);
    // }

    Admin.findOne({ where: { username: req.body.username } })
      .then(admin => {
        if (!admin) {
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
        } else if (!admin.validPassword(req.body.password)) {
          res.status(200).json({
            errors: [
              {
                value: null,
                msg: 'Password not match',
                param: 'password',
                location: 'body'
              }
            ]
          });
        } else {
          res.status(200).json({
            token: createToken({
              sessionData: admin.dataValues,
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
    Admin.findAll()
      .then(admin => {
        res.status(200).send(admin);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  delete: async (req, res) => {
    try {
      const admin = await Admin.destroy({ where: { id: req.body.id } });
      res.status(200).send(admin);
    } catch (error) {
      res.status(400).send(error);
    }
    // Admin.destroy({ where: { id: req.body.id } })
    //   .then(admin => {
    //     res.status(200).send(admin);
    //   })
    //   .catch(err => {
    //     res.status(400).send(err);
    //   });
  },

  findByUsername: async value => {
    try {
      return await Admin.findOne({ where: { username: value } });
    } catch (error) {
      throw new Error(error);
    }
  }
};
