// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.18.0
// source: linkedin_user_posts.sql

package db

import (
	"context"
	"time"
)

const fetchAllPosts = `-- name: FetchAllPosts :many
SELECT scheduled_post_id, account_id, author_urn, post_id_on_linkedin, post_json_string, post_type, scheduled_time, status, created_by, created_at, updated_at FROM socialhub.linkedin_scheduled_user_posts
WHERE created_by=($1)
LIMIT 10
`

func (q *Queries) FetchAllPosts(ctx context.Context, createdBy string) ([]SocialhubLinkedinScheduledUserPost, error) {
	rows, err := q.db.QueryContext(ctx, fetchAllPosts, createdBy)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []SocialhubLinkedinScheduledUserPost{}
	for rows.Next() {
		var i SocialhubLinkedinScheduledUserPost
		if err := rows.Scan(
			&i.ScheduledPostID,
			&i.AccountID,
			&i.AuthorUrn,
			&i.PostIDOnLinkedin,
			&i.PostJsonString,
			&i.PostType,
			&i.ScheduledTime,
			&i.Status,
			&i.CreatedBy,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const fetchPostsToBePublished = `-- name: FetchPostsToBePublished :many
SELECT scheduled_post_id, author_urn, post_type, post_json_string, scheduled_time FROM socialhub.linkedin_scheduled_user_posts
WHERE scheduled_time < now() and (status='SUBMITTED' or status='FAILED')
LIMIT $1
`

type FetchPostsToBePublishedRow struct {
	ScheduledPostID string    `json:"scheduled_post_id"`
	AuthorUrn       string    `json:"author_urn"`
	PostType        string    `json:"post_type"`
	PostJsonString  string    `json:"post_json_string"`
	ScheduledTime   time.Time `json:"scheduled_time"`
}

func (q *Queries) FetchPostsToBePublished(ctx context.Context, limit int32) ([]FetchPostsToBePublishedRow, error) {
	rows, err := q.db.QueryContext(ctx, fetchPostsToBePublished, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []FetchPostsToBePublishedRow{}
	for rows.Next() {
		var i FetchPostsToBePublishedRow
		if err := rows.Scan(
			&i.ScheduledPostID,
			&i.AuthorUrn,
			&i.PostType,
			&i.PostJsonString,
			&i.ScheduledTime,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const scheduleAUserPostOnLinkedin = `-- name: ScheduleAUserPostOnLinkedin :one
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
RETURNING scheduled_post_id, post_type, post_json_string, scheduled_time
`

type ScheduleAUserPostOnLinkedinParams struct {
	ScheduledPostID  string    `json:"scheduled_post_id"`
	AccountID        int64     `json:"account_id"`
	AuthorUrn        string    `json:"author_urn"`
	PostIDOnLinkedin string    `json:"post_id_on_linkedin"`
	PostJsonString   string    `json:"post_json_string"`
	PostType         string    `json:"post_type"`
	ScheduledTime    time.Time `json:"scheduled_time"`
	Status           string    `json:"status"`
	CreatedBy        string    `json:"created_by"`
}

type ScheduleAUserPostOnLinkedinRow struct {
	ScheduledPostID string    `json:"scheduled_post_id"`
	PostType        string    `json:"post_type"`
	PostJsonString  string    `json:"post_json_string"`
	ScheduledTime   time.Time `json:"scheduled_time"`
}

func (q *Queries) ScheduleAUserPostOnLinkedin(ctx context.Context, arg ScheduleAUserPostOnLinkedinParams) (ScheduleAUserPostOnLinkedinRow, error) {
	row := q.db.QueryRowContext(ctx, scheduleAUserPostOnLinkedin,
		arg.ScheduledPostID,
		arg.AccountID,
		arg.AuthorUrn,
		arg.PostIDOnLinkedin,
		arg.PostJsonString,
		arg.PostType,
		arg.ScheduledTime,
		arg.Status,
		arg.CreatedBy,
	)
	var i ScheduleAUserPostOnLinkedinRow
	err := row.Scan(
		&i.ScheduledPostID,
		&i.PostType,
		&i.PostJsonString,
		&i.ScheduledTime,
	)
	return i, err
}

const updatePostStatus = `-- name: UpdatePostStatus :one
UPDATE socialhub.linkedin_scheduled_user_posts
SET status=($1) WHERE scheduled_post_id=($2)
RETURNING scheduled_post_id, scheduled_time, status
`

type UpdatePostStatusParams struct {
	Status          string `json:"status"`
	ScheduledPostID string `json:"scheduled_post_id"`
}

type UpdatePostStatusRow struct {
	ScheduledPostID string    `json:"scheduled_post_id"`
	ScheduledTime   time.Time `json:"scheduled_time"`
	Status          string    `json:"status"`
}

func (q *Queries) UpdatePostStatus(ctx context.Context, arg UpdatePostStatusParams) (UpdatePostStatusRow, error) {
	row := q.db.QueryRowContext(ctx, updatePostStatus, arg.Status, arg.ScheduledPostID)
	var i UpdatePostStatusRow
	err := row.Scan(&i.ScheduledPostID, &i.ScheduledTime, &i.Status)
	return i, err
}
