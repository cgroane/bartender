update ingredient
set quantity = $1, unit = $2, title = $3, recipe_id = $4
where ingredient_id = $5;