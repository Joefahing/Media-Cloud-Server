'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    last_login: DataTypes.DATE,
    status: DataTypes.ENUM
  }, {
    freezeTableName: true,
    tableName: 'Users',
    timestamps: true,
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};