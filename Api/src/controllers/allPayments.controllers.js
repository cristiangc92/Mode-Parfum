const { Users , Payments } = require("../db");
const allPayments = async(req, res) => { 
    const users = await Payments.findAll({
        include: {
          model: Users,
        },
      });
    res.json(users);
} 

module.exports = { 
    allPayments
}