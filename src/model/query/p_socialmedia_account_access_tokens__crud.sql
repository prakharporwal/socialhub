-- name: SocialMediaAccount_fetchAccessToken :one
SELECT access_token, refresh_token 
FROM socialhub.p_socialmedia_account_access_tokens
WHERE user_email=($1)
AND platform=($2)
AND organisation_group_id=($3)
AND social_account_id=($4);

-- name: SocialMediaAccount_upsertAccessToken :one
INSERT INTO socialhub.p_socialmedia_account_access_tokens(
    access_token,
    refresh_token,
    token_scope,
    token_type,
    expires_at,
    platform,
    social_account_id,
    platform_username,
    organisation_group_id ,
    user_email
)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
ON CONFLICT (organisation_group_id,user_email,platform,social_account_id)
DO
UPDATE SET access_token=($1), refresh_token=($2),token_scope=($3), token_type=($4), expires_at=($5)
    RETURNING platform, token_scope, token_type, organisation_group_id,user_email;