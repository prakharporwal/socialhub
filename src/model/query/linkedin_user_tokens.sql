-- name: SaveLinkedinAccessToken :one
INSERT INTO socialhub.linkedin_account_access_tokens(
    organisation_group_id ,
    user_email            ,
    access_token          ,
    scope                 ,
    expires_at
)
VALUES ($1,$2,$3,$4,$5)
ON CONFLICT (organisation_group_id,user_email)
DO
UPDATE SET access_token=($3)
RETURNING user_email, scope;

-- name: FindLinkedInAccountAccessToken :one
SELECT * FROM socialhub.linkedin_account_access_tokens
WHERE organisation_group_id=($1) and user_email=($2);

-- name: SaveLinkedinURN :one
UPDATE socialhub.linkedin_account_access_tokens
SET linkedin_urn=($1)
WHERE organisation_group_id=($2) and user_email=($3)
RETURNING linkedin_urn, scope;