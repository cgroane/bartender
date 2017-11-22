update users
set username = $1, image_url = $2
where user_id = $3;