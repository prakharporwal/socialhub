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
SELECT access_token FROM socialhub.twitter_account_access_tokens
WHERE organisation_group_id=($1) and user_email=($2);

-- name: TwitterAccountAccessTokens_fetchAccountInfoByUserEmail :one
SELECT twitter_id, twitter_username, access_token FROM socialhub.twitter_account_access_tokens
WHERE organisation_group_id=($1) and user_email=($2);

-- name: TwitterAccountAccessTokens_updateUsernameAndId :one
UPDATE socialhub.twitter_account_access_tokens
SET twitter_id=($1), twitter_username=($2)
WHERE organisation_group_id=($3) and user_email=($4)
RETURNING user_email, twitter_username;
