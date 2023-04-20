-- name: SaveLinkedinAccessToken :one
INSERT INTO socialhub.linkedin_account_access_tokens(
    organisation_group_id ,
    user_email            ,
    access_token          ,
    scope                 ,
    expires_at
)
VALUES ($1,$2,$3,$4,$5)
RETURNING user_email, scope;

-- name: FindLinkedInAccountAccessToken :one
SELECT * FROM socialhub.linkedin_account_access_tokens
WHERE organisation_group_id=($1) and user_email=($2);
