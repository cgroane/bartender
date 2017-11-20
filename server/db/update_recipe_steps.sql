update steps
set step_number = $1, step_description = $2, recipe_id = $3
where step_id = $4;