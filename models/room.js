'use strict';

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'Room',
    {
      type: {
        allowNull: false,
        type: DataTypes.STRING(50)
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
          return `/img/room/${image}`;
        }
      },
      quantity: {
        allowNull: false,
        type: DataTypes.NUMBER(3)
      },
      price: {
        allowNull: false,
        type: DataTypes.NUMBER(7)
      }
    },
    {}
  );
  Room.associate = function(models) {
    // associations can be defined here
    Room.belongsTo(models.Admin, {
      foreignKey: 'adminId'
    });
  };
  return Room;
};
