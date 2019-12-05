'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        validate: {
          notEmpty: true
        }
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(30),
        validate: {
          isEmail: true,
          notEmpty: true
        },
        unique: true
      },
      telp: {
        type: DataTypes.STRING(20),
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
    {
      hooks: {
        beforeCreate: customer => {
          const salt = bcrypt.genSaltSync(5);
          // eslint-disable-next-line no-param-reassign
          customer.password = bcrypt.hashSync(customer.password, salt);
        }
      }
    }
  );
  Customer.associate = function(models) {
    // associations can be defined here
  };

  Customer.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return Customer;
};
