'use strict';

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'Room',
    {
      type: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: true
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
        get() {
          const image = this.getDataValue('image');
          return `/uploads/img/room/${image}`;
        }
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER(3)
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER(10)
      }
    },
    {}
  );
  Room.associate = function(models) {
    // associations can be defined here
    Room.belongsTo(models.Admin, {
      foreignKey: 'adminId'
    });
    Room.hasMany(models.Booking, {
      foreignKey: 'roomId',
      as: 'bookings'
    });
  };
  return Room;
};
