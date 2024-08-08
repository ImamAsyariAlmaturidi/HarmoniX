"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "fisrt name cannot be empty",
          },
          notEmpty: {
            msg: "fisrt name cannot be empty",
          },
        },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "last name cannot be empty",
          },
          notNull: {
            msg: "last name cannot be empty",
          },
        },
      },
      email: { 
        allowNull: false, 
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true, 
          notEmpty: {
           msg: "email cannot be empty"
          },
          notNull: {
            msg: "email cannot be empty"
          }
        }
       },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "phone number cannot be empty"
          },
          notNull: {
            msg: "phone number cannot be empty"
          }
        }},
      premium: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          notEmpty: {
            msg: "premiun status cannot be empty"
          },
          notNull: {
            msg: "premiun status cannot be empty"
          }
        }
      },
      password: {
        allowNull: false, 
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "password cannot be empty"
          },
          notNull: {
            msg: "password cannot be empty"
          }
        }},
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password);
    instance.premium = false;
  });
  return User;
};
