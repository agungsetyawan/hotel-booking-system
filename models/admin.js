'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      freezeTableName: true,
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync(5);
          // eslint-disable-next-line no-param-reassign
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  );
  Admin.associate = function(models) {
    // associations can be defined here
  };

  Admin.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return Admin;
};
