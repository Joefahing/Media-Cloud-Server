'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require("../config/index").JWT_SECRET;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    freezeTableName: true,
    tableName: 'Users',
    timestamps: true,
  });
  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.isValidPassword = function (password){
    return new Promise((resolve, reject) =>{
        bcrypt.compare(password, this.password, (err, result) =>{
          if(err) reject(err);
          else resolve(result);
      });
    }) 
  }

  User.prototype.isValidPasswordSync = function(password){
    return bcrypt.compareSync(password, this.password);
  }

  User.prototype.generateJWT = function(){
      const payload = {
        id: this.id,
        email: this.email,
      }
      
      const exp = 600;
      return jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
  }

  User.prototype.authJWT = function(){
      return {
        id:  this.id,
        email: this.email,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        token: this.generateJWT(),
      }
  }
  return User;
};
