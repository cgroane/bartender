select * from recipe_tastes 
join recipes on recipes.recipe_id = recipe_tastes.recipe_id
where recipe_tastes.title like $1;