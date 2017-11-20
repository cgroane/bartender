select * from comments
join users on users.user_id = comments.user_id
where comments.recipe_id = $1;