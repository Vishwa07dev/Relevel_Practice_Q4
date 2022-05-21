/**
 * logic to transform the object will be here
 */


/**
 * orders List response
 */
 exports.orderListResponse = (orders) => {
    
    orderResponse = [];
    
    orders.forEach((order) => {
      orderResponse.push({

        items : order.items, 
        totalCost : order.totalCost,
        zipCode : order.zipCode,
        userId : order.userId,
        status : order.status
            
    });
    
    });

    return orderResponse;        

}


exports.userResponse = (orders) => {
    
  userResponse = [];
  
  users.forEach((order) => {
    userResponse.push({

      userId : user.userId, 
      name : user.name, 
      email : user.email, 
      userType : user.userType, 
      address : user.address, 
      orders : user.orders
          
  });
  
  });

  return userResponse;        

}