-- name: SaveTwitterAccessToken :one
INSERT INTO socialhub.twitter_account_access_tokens(
    organisation_group_id ,
    user_email            ,
    access_token          ,
    token_scope           ,
    expires_at
)
VALUES ($1,$2,$3,$4,$5)
    ON CONFLICT (organisation_group_id,user_email)
DO
UPDATE SET access_token=($3), token_scope=($4), expires_at=($5)
    RETURNING user_email, token_scope;

-- name: FindTwitterAccountAccessToken :one
SELECT * FROM socialhub.twitter_account_access_tokens
WHERE organisation_group_id=($1) and user_email=($2);