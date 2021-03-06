const _ = require('lodash');
const { Booking } = require('../models');
const db = require('../models');
const Room = require('../controllers/room');

async function isAllowUpdate(id) {
  try {
    const query = `SELECT*FROM Bookings WHERE Bookings.startDate> CURDATE() AND Bookings.STATUS='booking' AND id=:id`;
    const result = await db.sequelize.query(query, {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.SELECT
    });
    if (result.length) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

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
      const findAvailable = await Room.availableQuery(
        req.body.startDate,
        req.body.endDate,
        req.body.numberOfRoom
      );
      const isAvailable = _.some(findAvailable, function(item) {
        return (
          item.id === parseInt(req.body.roomId, 10) &&
          item.roomsAvailable >= parseInt(req.body.numberOfRoom, 10)
        );
      });
      if (isAvailable) {
        const result = await Booking.create({
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          status: req.body.status,
          numberOfRoom: req.body.numberOfRoom, // for multiple rooms
          roomId: req.body.roomId,
          customerId: req.user.id
        });
        res.status(201).send(result);
      } else {
        res.status(200).json({ success: false, msg: `room not available` });
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
      if (!(await isAllowUpdate(req.params.id))) {
        return res
          .status(200)
          .json({ success: false, msg: `booking ${req.params.id} not allow to update` });
      }
      const findAvailable = await Room.availableQuery(
        req.body.startDate,
        req.body.endDate,
        req.body.numberOfRoom
      );
      const isAvailable = _.some(findAvailable, function(item) {
        return (
          item.id === parseInt(req.body.roomId, 10) &&
          item.roomsAvailable >= parseInt(req.body.numberOfRoom, 10)
        );
      });
      if (isAvailable) {
        const result = await Booking.update(
          {
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            numberOfRoom: req.body.numberOfRoom, // for multiple rooms
            roomId: req.body.roomId,
            customerId: req.user.id
          },
          { where: { id: req.params.id } }
        );
        if (result[0] === 0) {
          res.status(200).json({ success: false, msg: `booking ${req.params.id} failed updated` });
        } else {
          res.status(200).json({ success: true, msg: `booking ${req.params.id} updated` });
        }
      } else {
        res.status(200).json({ success: false, msg: `room not available` });
      }
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
  },

  me: async (req, res) => {
    try {
      const result = await Booking.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { customerId: req.user.id }
      });
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
