'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(30),
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(50)
      }
    },
    {
      freezeTableName: true,
      hooks: {
        beforeCreate: admin => {
          const salt = bcrypt.genSaltSync(5);
          // eslint-disable-next-line no-param-reassign
          admin.password = bcrypt.hashSync(admin.password, salt);
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
