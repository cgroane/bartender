select * from steps where recipe_id = $1
order by step_number ASC;