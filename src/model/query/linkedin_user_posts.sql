-- name: ScheduleAUserPostOnLinkedin :one
INSERT INTO socialhub.linkedin_scheduled_user_posts (
        scheduled_post_id,
        account_id,
        author_urn,
        post_id_on_linkedin,
        post_json_string,
        post_type,
        scheduled_time,
        status,
        created_by)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING scheduled_post_id, post_type, post_json_string, scheduled_time;

-- name: FetchPostsToBePublished :many
SELECT scheduled_post_id, author_urn, post_type, post_json_string, scheduled_time FROM socialhub.linkedin_scheduled_user_posts
WHERE scheduled_time < now() and (status='SUBMITTED' or status='FAILED')
LIMIT $1;


-- name: UpdatePostStatus :one
UPDATE socialhub.linkedin_scheduled_user_posts
SET status=($1) WHERE scheduled_post_id=($2)
RETURNING scheduled_post_id, scheduled_time, status;
