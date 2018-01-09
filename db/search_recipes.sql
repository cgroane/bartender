select * from recipes
join ingredient on ingredient.recipe_id = recipes.recipe_id
where LOWER (ingredient.title) like $1;