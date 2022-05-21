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