-- name: SaveLinkedinAccessToken :one
INSERT INTO socialhub.linkedin_account_access_tokens(
    organisation_group_id ,
    user_email            ,
    access_token          ,
    token_scope                 ,
    expires_at
)
VALUES ($1,$2,$3,$4,$5)
ON CONFLICT (organisation_group_id,user_email)
DO
UPDATE SET access_token=($3), token_scope=($4), expires_at=($5)
RETURNING user_email, token_scope;

-- name: FindLinkedInAccountAccessToken :one
SELECT * FROM socialhub.linkedin_account_access_tokens
WHERE organisation_group_id=($1) and user_email=($2);

-- name: SaveLinkedinURN :one
UPDATE socialhub.linkedin_account_access_tokens
SET linkedin_urn=($1)
WHERE organisation_group_id=($2) and user_email=($3)
RETURNING linkedin_urn, token_scope;

-- name: FetchLinkedinURNbyAccountId :one
SELECT linkedin_urn FROM socialhub.linkedin_account_access_tokens
WHERE organisation_group_id=($1) and user_email=($2);