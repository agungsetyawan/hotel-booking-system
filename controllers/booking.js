const { Booking } = require('../models');

module.exports = {
  list: async (req, res) => {
    try {
      const result = await Booking.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const findType = await Booking.findOne({ where: { type: req.body.type } });
      if (!findType) {
        const result = await Booking.create({
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
      const result = await Booking.destroy({ where: { id: req.params.id } });
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
          msg: `Booking ${req.params.id} deleted`
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
  },

  cancel: async (req, res) => {
    try {
      const result = await Booking.findOne({ where: { id: req.params.id } });
      if (result) {
        if (await result.cancel()) {
          res
            .status(200)
            .send({ success: true, msg: `booking id ${req.params.id} success to cancel` });
        } else {
          res.status(200).send({ success: false, msg: `booking id ${req.params.id} has canceled` });
        }
      } else {
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
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
