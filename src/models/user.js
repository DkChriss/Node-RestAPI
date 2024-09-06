const { Model } = require('sequelize');
const sequelize = require('../app/database');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
        notNull: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });
  return User;
};