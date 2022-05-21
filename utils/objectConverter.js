

exports.userResponse = (users) => {
    usersResponse = [];

    users.forEach(user => {
        usersResponse.push({
            name: user.name,
            userType: user.userType,
            userId: user.userId,
            createdAt : user.createdAt,
            updatedAt : user.updatedAt
        });
    })

    return usersResponse
}

