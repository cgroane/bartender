module.exports = {
    getAll: function (req, res, next) {
        const dbInstance = req.app.get('db')
        dbInstance.get_recipes()
        .then( recipes => res.status(200).send(recipes))
        .catch( () => res.status(500).send())
    },

    getSteps: function (req, res, next) {
        const dbInstance = req.app.get('db')
        
        dbInstance.get_steps(req.params.recipe_id)
        .then( steps => res.status(200).send(steps) )
        .catch( () => res.status(500).send());
    },

    getIngredients: function (req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.get_recipe_ingredients([req.params.recipe_id])
        .then( ingredients => res.status(200).send(ingredients))
        .catch( () => res.status(500).send());
    },

    getRecipe: function (req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.get_single_recipe([req.params.recipe_id])
        .then(recipe => res.status(200).send(recipe))
        .catch(() => res.status(500).send());
    },

    addRecipe: function (req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.create_recipe([req.body.recipe_title, req.body.recipe_description, req.body.image_url, req.params.user_id, req.body.serves])
        .then(recipe => res.status(200).send(recipe))
        .catch( () => res.status(500).send());
    },

    addStep: function (req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.create_recipe_steps([req.body.step_number, req.body.step_description, req.params.recipe_id])
        .then(res.status(200).send())
        .catch(() => res.status(500).send());
    },

    getUserRecipes: function (req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.get_my_recipes(req.params.user_id)
        .then(recipe => res.status(200).send(recipe))
        .catch( () => res.status(500).send());
    },

    getRecommended: function (req, res, next) {
        const dbInstance = req.app.get('db');

        dbInstance.get_recommendations(req.params.title)
        .then(recipes => res.status(200).json(recipes))
        .catch(() => res.status(500).send());
    },
    getRecipeComments: function (req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.get_recipe_comments([req.params.recipe_id])
        .then(comments => res.status(200).send(comments))
        .catch(() => res.status(500).send());
    },

    addComment: function (req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.add_comment([req.params.recipe_id, req.body.user_id, req.body.content])
        .then(res.status(200).send())
        .catch( () => res.status(500).send());
    },

    updateRecipe(req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.update_recipe([req.body.recipe_title, req.body.recipe_description, req.body.image_url, req.body.user_id, req.body.serves, req.params.recipe_id])
        .then(res.status(200).send())
        .catch(() => res.status(500).send());
    },
    
    updateRecipeSteps(req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.update_recipe_steps([req.body.step_number, req.body.step_description, req.params.recipe_id, req.body.step_id])
        .then(res.status(200).send())
        .catch(() => res.status(500).send());
    },

    updateRecipeIngredients(req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.update_recipe_ingredients([req.body.quantity, req.body.unit, req.body.title, req.params.recipe_id, req.body.ingredient_id])
        .then(res.status(200).send())
        .catch(res.status(500).send());
    },
    addIngredient: function (req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.add_ingredient([req.body.quantity, req.body.unit, req.body.title, req.params.recipe_id])
        .then(res.status(200).send())
        .catch(() => res.status(500).send());
    },
    deleteSteps: function (req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.delete_steps([req.params.recipe_id]).then(res.status(200).send())
        .catch(() => res.status(500).send());
    },
    deleteIngredients: function (req, res, next) {
        const dbInstance = req.app.get('db')
        
        dbInstance.delete_ingredients([req.params.recipe_id]).then(res.status(200).send())
        .catch(() => res.status(500).send());
    },
    deleteRecipe: function (req, res, next){
        const dbInstance = req.app.get('db')
        
        dbInstance.delete_recipe([req.params.recipe_id]).then(res.status(200).send())
        .catch(() => res.status(500).send());
    },
    searchRecs: function (req, res, next) {
        const dbInstance = req.app.get('db')

        dbInstance.search_recipes([req.params.search_terms])
        .then((recipes) => res.status(200).send(recipes))
        .catch(() => res.status(500).send())
    }
}

// insert into ingredient (quantity, unit, title, recipe_id) values ($1, $2, $3, $4);

// set quantity = $1, unit = $2, title = $3, recipe_id = $4
// where ingredient_id = $5;