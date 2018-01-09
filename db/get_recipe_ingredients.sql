select * from ingredient
join recipes on recipes.recipe_id = ingredient.recipe_id
where ingredient.recipe_id = $1;