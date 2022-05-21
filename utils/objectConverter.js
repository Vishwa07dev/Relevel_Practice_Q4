/**
 * I will have the logic to transform the object
 */

 exports.userResponse = (users) => {
    usersResponse = [];

    users.forEach(user => {
        usersResponse.push({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            address: user.address,
            userStatus: user.userStatus
        });
    })

    return usersResponse
};

exports.orderResponse = (order)=>{
    return {
        items: order.items,
       customerId: order.customerId,
       zipCode: order.zipCode,
       totalCost: order.totalCost,
       deliveryDate: order.deliveryDate,
       orderStatus: order.orderStatus,
       _id: order._id,
       createdAt: order.createdAt,
       updatedAt : order.updatedAt

    }
} ;