-- name: PostInfo_createPost :one
INSERT INTO socialhub.p_post_info (
    post_id,
    post_type,
    creation_status,
    post_url,
    post_text,
    post_img_url,
    post_video_url,
    organisation_group_id,
    is_deleted,
    user_email,
    created_by
)
VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $9)
RETURNING post_id, post_url;

-- name: PostInfo_updatePost :one
UPDATE socialhub.p_post_info
SET
    post_type= ($2),
    creation_status= ($3),
    post_text = ($4),
    post_img_url = ($5), 
    post_video_url = ($6)
WHERE post_id=($1) and is_deleted = false
RETURNING post_id, post_url, creation_status;

-- name: PostInfo_getPostCreator :one
SELECT user_email 
FROM socialhub.p_post_info
WHERE post_id=($1);

-- name: PostInfo_getPost :one
SELECT post_id, post_type, creation_status, post_text, post_img_url, post_video_url, user_email 
FROM socialhub.p_post_info
WHERE post_id=($1) AND is_deleted = false;

-- name: PostInfo_getPostsPaginated :many
SELECT post_id, post_type, creation_status, post_text, post_img_url, post_video_url, user_email 
FROM socialhub.p_post_info
WHERE user_email=($1) AND is_deleted = false
ORDER BY created_at DESC
LIMIT ($2)
OFFSET ($3);

-- soft delete the post
-- name: PostInfo_deletePost :one
UPDATE socialhub.p_post_info
SET is_deleted = true
WHERE post_id=($1)
RETURNING post_id, post_url, is_deleted;