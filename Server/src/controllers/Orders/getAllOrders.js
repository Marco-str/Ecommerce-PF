const { Orders } = require("../../db");


const getAllOrders = async (id) => {

        if (id) {
            const orders = await Orders.findAll({
                where: {
                    userId: id,
                },
            });
            return orders;
        }
        else {

                
                const orders = await Orders.findAll();
                return orders;
        }
 
}

module.exports = getAllOrders;