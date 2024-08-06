const midtransClient = require("midtrans-client");
const axios = require("axios");
const { generateUniqueOrderId } = require("../helpers/timestamp");
const { User, Transaction } = require("../models");
class Controller {
  static async createTransaction(req, res) {
    try {
      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.SERVER_KEY_MIDTRANS,
      });

      const user = await User.findOne({
        where: {
          id: 1,
        },
      });

      const order_id = generateUniqueOrderId();

      const transaction = await Transaction.create({
        UserId: user.id,
        order_id,
        gross_amount: 52000,
      });

      const parameter = {
        transaction_details: {
          order_id: transaction.order_id,
          gross_amount: transaction.gross_amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      };

      const { token } = await snap.createTransaction(parameter);

      res.status(201).json({
        token,
        order_id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateTransactionStatus(req, res, next) {
    try {
      const { UserId } = req.loginInfo;
      const { order_id, token } = req.body;
      const transaction = await Transaction.findOne({
        where: {
          order_id,
        },
      });

      if (!transaction) throw { name: "NotFound" };

      const base64Key = Buffer.from(process.env.SERVER_KEY_MIDTRANS).toString(
        "base64"
      );
      const { data } = await axios.get(
        `https://api.sandbox.midtrans.com/v2/${order_id}/status`,
        {
          headers: {
            Authorization: `Basic ${base64Key}`,
          },
        }
      );

      if (+data.status_code !== 200) {
        throw { name: "BadRequest" };
      }

      if (data.transaction_status !== "settlement") {
        throw { name: "BadRequest" };
      }

      await Transaction.update({
        transaction_status: "paid",
        transaction_token: token,
      }, {
        where: {
            order_id
        }
      });

      await User.update(
        {
          premium: true,
        },
        {
          where: {
            id: UserId,
          },
        }
      );

      res.status(200).json({
        message: "Payment success!",
      });
    } catch (err) {
      console.log(err, "bad request");
    }
  }
}

module.exports = Controller;
