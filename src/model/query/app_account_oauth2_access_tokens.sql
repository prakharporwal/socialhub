-- name: AppAccountOauth2AccessTokens_SaveToken :one
INSERT INTO socialhub.app_account_oauth2_access_tokens(
    organisation_group_id ,
    user_email            ,
    app_name,
    access_token          ,
    refresh_token,
    token_scope                 ,
    expires_at
)
VALUES ($1,$2,$3,$4,$5,$6,$7)
    ON CONFLICT (organisation_group_id, user_email)
DO
UPDATE SET access_token=($4), refresh_token=($5), token_scope=($6), expires_at=($7)
    RETURNING user_email, app_name, token_scope;