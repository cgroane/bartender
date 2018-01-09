select * from favorites
join recipes on recipes.recipe_id = favorites.recipe_id
where favorites.user_id = $1;