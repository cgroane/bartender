module.exports = {
    getAllUserData: function (req, res, next) {
        const dbInstance = req.app.get('db')
        var userInfo = {
            user: {},
            favorites: [],
            userRecs: [],
            recommendations: [],
        };
        userInfo.user = req.user;
        dbInstance.get_user(userInfo.user.user_id).then(user => {
            return dbInstance.get_favorites(userInfo.user.user_id).then(favorites => {
                userInfo.favorites = favorites;
            })
        })
        return userInfo;
},

getUserTastes: function (req, res, next) {
    const dbInstance =req.app.get('db')

    dbInstance.get_user_tastes(req.params.user_id)
    .then(tastes => res.status(200).send(tastes))
    .catch(()=> res.status(500).send())
},
updateUser: function (req, res, next) {
    const dbInstance = req.app.get('db')
    
    dbInstance.update_user([req.body.username, req.body.image_url, req.params.user_id])
    .then((user) => {
        req.user = user[0]
       
        res.status(200).send(user[0])
    })
    .catch(() => res.status(500).send())
}


// function getUserFavorites () {
//     var userInfo = {};
//     return axios.get('/api/me').then(response => {
//         userInfo.user = response.data
        
//     }).then(() => axios.get(`/api/favorites/${userInfo.user.user_id}`).then(response => {
//         userInfo.user.favorites = response.data
//         return userInfo;    
//         }

//     ));
}