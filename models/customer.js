'use strict';

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      telp: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: true
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.ENUM('male', 'female')
      },
      dob: DataTypes.DATEONLY
    },
    {}
  );
  Customer.associate = function(models) {
    // associations can be defined here
  };
  return Customer;
};
