-- name: UserPasswordResetTokens_insert :one
INSERT INTO socialhub.user_password_reset_tokens(
    organisation_group_id,
    user_id,
    token,
    expires_at,
    requested_by_client_ip
)
VALUES ($1,$2,$3,$4,$5)
RETURNING organisation_group_id, user_id, token;

-- name: UserPasswordResetTokens_blockToken :one
UPDATE socialhub.user_password_reset_tokens
SET is_expired=true
WHERE organisation_group_id=($1) and user_id=($2) and token=($3)
RETURNING organisation_group_id, user_id, token, is_expired ;

-- name: UserPasswordResetTokens_delete :exec
DELETE FROM socialhub.user_password_reset_tokens
WHERE token=($1);

-- name: UserPasswordResetTokens_findUserIdByToken :one
SELECT user_id, organisation_group_id, is_expired, expires_at
FROM socialhub.user_password_reset_tokens
WHERE token=($1);