const midtransClient = require('midtrans-client');
const { generateUniqueOrderId } = require('../helpers/timestamp')
const { User, Transaction } = require('../models');
class Controller{
    static async createTransaction(req, res){
        try {
            const snap = new midtransClient.Snap({
                isProduction : false,
                serverKey : process.env.SERVER_KEY_MIDTRANS
            });

            const user = await User.findOne({
                where: {
                    id: 1
                }
            })

            const order_id = generateUniqueOrderId()

            const transaction = await Transaction.create({
                UserId: user.id,
                order_id,
                gross_amount: 52000
            })

            const parameter = {
                "transaction_details": {
                    "order_id": transaction.order_id,
                    "gross_amount": transaction.gross_amount
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "first_name": user.firstName,
                    "last_name": user.lastName,
                    "email": user.email,
                    "phone": user.phone
                }
            };

            const {token, redirect_url} = await snap.createTransaction(parameter)

            res.status(201).json({
                token,
                redirect_url
            })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Controller