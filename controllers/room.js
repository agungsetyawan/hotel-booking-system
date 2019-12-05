const { Room } = require('../models');

module.exports = {
  list: async (req, res) => {
    try {
      const result = await Room.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const findType = await Room.findOne({ where: { type: req.body.type } });
      if (!findType) {
        const result = await Room.create({
          type: req.body.type,
          description: req.body.description,
          // image: 'test',
          image: req.files.image,
          quantity: req.body.quantity,
          price: req.body.price,
          adminId: req.user.id
        });
        res.status(201).send(result);
      } else {
        res.status(200).json({
          errors: [
            {
              value: req.body.type,
              msg: 'Type already in use',
              param: 'type',
              location: 'body'
            }
          ]
        });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      const result = await Room.destroy({ where: { id: req.body.id } });
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
          msg: `Room ${req.body.id} deleted`
        });
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async (req, res) => {
    try {
      res.status(200).send('test');
    } catch (error) {
      res.status(400).send(error);
    }
  }
};