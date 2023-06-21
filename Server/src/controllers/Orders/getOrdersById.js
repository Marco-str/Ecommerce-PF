const { Users , Orders } = require('../../db');


const getOrdersById = async (id) => {   
  
        const orders = await Orders.findAll({
            where: {
                userId: id
            }
        });
        return orders; 
}

module.exports = getOrdersById;