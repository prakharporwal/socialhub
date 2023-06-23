-- name: CreateSession :one
INSERT INTO socialhub.sessions(
    session_id,
    email ,
    user_agent,
    client_ip,
    refresh_token,
    expires_at
)
VALUES ($1,$2,$3,$4,$5,$6)
RETURNING *;

-- name: GetSession :one
SELECT * FROM socialhub.sessions where session_id=($1);

-- name: BlockSessionById :one
UPDATE socialhub.sessions SET is_blocked=true
WHERE session_id=($1)
RETURNING *;


-- name: BlockSessionFamily :one
UPDATE socialhub.sessions SET is_blocked=true
WHERE email=($1)
RETURNING *;