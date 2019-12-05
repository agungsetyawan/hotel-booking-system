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

  Booking.prototype.cancel = function() {
    // Booking.update({ status: 'cancel' }, { where: { id: id } });
    if (this.status !== 'cancel') {
      this.status = 'cancel';
      this.updatedAt = DataTypes.NOW;
    }
  };

  return Booking;
};
