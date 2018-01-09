update recipes
SET recipe_title = $1, recipe_description = $2, image_url = $3, user_id = $4, serves = $5
where recipe_id = $6;