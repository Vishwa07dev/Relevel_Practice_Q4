/**
 * I will have the logic to transform the object
 */

exports.userResponse = (users) => {
    usersResponse = [];

    users.forEach(user => {
        usersResponse.push({
            name: user.name,
            userId: user.userId,
            userType: user.userType,
            createdAt : user.createdAt,
            updatedAt : user.updatedAt
        });
    })

    return usersResponse
}

