insert INTO users (authId, username) VALUES ($1, $2) RETURNING authId, username;