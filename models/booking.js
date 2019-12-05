'use strict';

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      startDate: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('booking', 'cancel')
      },
      numberOfRoom: {
        allowNull: false,
        type: DataTypes.INTEGER(2),
        defaultValue: 1
      }
    },
    {}
  );
  Booking.associate = function(models) {
    // associations can be defined here
    Booking.belongsTo(models.Room, {
      foreignKey: 'roomId'
    });
    Booking.belongsTo(models.Customer, {
      foreignKey: 'customerId'
    });
  };

  Booking.prototype.cancel = async function() {
    if (this.status !== 'cancel') {
      await Booking.update({ status: 'cancel' }, { where: { id: this.id } });
      return true;
    }
    return false;
  };

  return Booking;
};
