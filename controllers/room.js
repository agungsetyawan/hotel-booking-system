const _ = require('lodash');
const { Room } = require('../models');
const db = require('../models');

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
          // image: req.files.image,
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
      const result = await Room.destroy({ where: { id: req.params.id } });
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
          msg: `Room ${req.params.id} deleted`
        });
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const result = await Room.update(
        {
          type: req.body.type,
          description: req.body.description,
          // image: req.files.image,
          quantity: req.body.quantity,
          price: req.body.price,
          adminId: req.user.id
        },
        { where: { id: req.params.id } }
      );
      console.log(result);
      if (result[0] === 0) {
        res.status(200).json({ success: false, msg: `room ${req.params.id} failed updated` });
      } else {
        res.status(200).json({ success: true, msg: `room ${req.params.id} updated` });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  available: async (req, res) => {
    try {
      const query = `SELECT Rooms.id, Rooms.type, Rooms.description, Rooms.image, Rooms.price,
                      Rooms.quantity - IFNULL( SUM( Bookings.numberOfRoom ), 0 ) AS "roomsAvailable"
                      FROM Rooms
                      LEFT OUTER JOIN Bookings ON Bookings.roomId = Rooms.id
                      AND Bookings.startDate < :checkOut
                      AND Bookings.endDate > :checkIn
                      AND Bookings.status = 'booking'
                      GROUP BY Rooms.id, Rooms.type, Rooms.quantity
                      ORDER BY Rooms.price ASC`;
      const result = await db.sequelize.query(query, {
        replacements: { checkIn: req.query.checkIn, checkOut: req.query.checkOut },
        type: db.sequelize.QueryTypes.SELECT
      });
      const normalisedResult = result.map(item => {
        _.set(item, 'image', `/uploads/img/room/${item.image}`);
        return _.set(item, 'roomsAvailable', parseInt(item.roomsAvailable, 10));
      });
      res.status(200).send(normalisedResult);
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
