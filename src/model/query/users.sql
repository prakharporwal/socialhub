-- name: CreateUser :one
INSERT INTO socialhub.users (user_email, username, password_hash, organisation_group_id, is_verified)
VALUES ( $1, $2, $3, $4, $5)
RETURNING user_email, username, organisation_group_id;

-- name: GetUserDetails :one
SELECT user_email, username, organisation_group_id, password_hash
FROM socialhub.users WHERE (user_email=($1) or username=($1)) and organisation_group_id=($2);

-- name: Users_updatePassword :one
UPDATE socialhub.users
SET password_hash=($3)
WHERE user_email=($1) and organisation_group_id=($2)
RETURNING user_email, organisation_group_id;