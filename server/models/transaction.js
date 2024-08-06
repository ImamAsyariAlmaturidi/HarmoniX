const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User);
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    order_id: DataTypes.STRING,
    transaction_status:{
      type:DataTypes.STRING,
      defaultValue: 'pending'
    },
    gross_amount: DataTypes.DECIMAL,
    transaction_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};