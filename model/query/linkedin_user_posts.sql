-- name: LinkedinScheduleUserPost :one
INSERT INTO socialhub.linkedin_scheduled_user_posts (scheduled_post_id,
                                                     account_id,
                                                     linkedin_urn,
                                                     post_id,
                                                     scheduled_time,
                                                     status,
                                                     created_by)
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING scheduled_post_id, post_id, scheduled_time;