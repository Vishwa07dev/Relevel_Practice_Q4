
exports.userCreationObject = (userCreated) => {
       return {
       _id: userCreated._id,
        name : userCreated.name,
        userId : userCreated.userId,
        email: userCreated.email,
        createdAt : userCreated.createdAt,
        updatedAt : userCreated.updatedAt
    }
}

exports.userSignInObject = (user) => {
       return {
        name : user.name,
        email: user.email,
        token: user.token
    }
}

exports.orderListResponse = (orders) => {
    orderResult = [];
    orders.forEach(order => {
       orderResult.push({
            _id: order.title,
            status: order.status, 
            items: order.items,
            address: order.address,
            totalCost: order.totalCost,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt 
       });   
    });
    return orderResult;
}
