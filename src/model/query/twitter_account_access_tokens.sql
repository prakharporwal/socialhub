-- name: TwitterAccountAccessTokens_saveAccessToken :one
INSERT INTO socialhub.twitter_account_access_tokens(
    organisation_group_id ,
    user_email            ,
    access_token          ,
    refresh_token         ,
    token_scope           ,
    expires_at
)
VALUES ($1,$2,$3,$4,$5,$6)
    ON CONFLICT (organisation_group_id,user_email)
DO
UPDATE SET access_token=($3), refresh_token=($4),token_scope=($5), expires_at=($6)
    RETURNING user_email, token_scope;

-- name: TwitterAccountAccessTokens_findAccessToken :one
SELECT access_token, refresh_token FROM socialhub.twitter_account_access_tokens
WHERE organisation_group_id=($1) and user_email=($2);

-- name: TwitterAccountAccessTokens_fetchAccountInfoByUserEmail :one
SELECT twitter_id, twitter_username, access_token FROM socialhub.twitter_account_access_tokens
WHERE organisation_group_id=($1) and user_email=($2);

-- name: TwitterAccountAccessTokens_updateUsernameAndId :one
UPDATE socialhub.twitter_account_access_tokens
SET twitter_id=($1), twitter_username=($2)
WHERE organisation_group_id=($3) and user_email=($4)
RETURNING user_email, twitter_username;


-- name: TwitterAccountAccessTokens_fetchAll :many
SELECT organisation_group_id, user_email,twitter_username, access_token, refresh_token
FROM socialhub.twitter_account_access_tokens
LIMIT ($1);
