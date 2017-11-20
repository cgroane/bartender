module.exports = {
    addFavorite: function (req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.add_favorite([req.params.user_id, req.body.recipe_id])
        .then(res.status(200).send())
        .catch( () => res.status(500).send());
    },

    getFavorites: function (req, res, next) {
        const dbInstance = req.app.get('db')

        

            dbInstance.get_favorites([req.params.user_id])
            .then( favorites => res.status(200).send(favorites))
            .catch( () => res.status(500).send());
        
   }
}