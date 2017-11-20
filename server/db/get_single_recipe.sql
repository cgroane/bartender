select * from recipes
join users on users.user_id = recipes.recipe_id
where recipes.recipe_id = $1;