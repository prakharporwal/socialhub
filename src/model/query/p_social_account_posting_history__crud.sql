-- name: PostingHistory_addPost :many
INSERT INTO socialhub.p_social_account_posting_history (
    post_id,
    posting_status,
    social_account_id,
    platform,
    scheduled_time,
    created_by
)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id, post_id, social_account_id, platform, posting_status, scheduled_time;

-- name: PostingHistory_fetchPost :one
SELECT
    a.post_id,
    post_type,
    post_text,
    post_img_url,
    post_video_url,
    posting_status,
    social_account_id,
    platform,
    scheduled_time
FROM socialhub.p_post_info a
JOIN socialhub.p_social_account_posting_history b ON a.post_id = b.post_id
WHERE a.post_id = ($1) AND b.is_deleted = false;
