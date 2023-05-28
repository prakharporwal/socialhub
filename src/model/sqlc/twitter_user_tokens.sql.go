// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.18.0
// source: twitter_user_tokens.sql

package db

import (
	"context"
	"time"
)

const findTwitterAccountAccessToken = `-- name: FindTwitterAccountAccessToken :one
SELECT organisation_group_id, user_email, twitter_id, access_token, scope, expires_at, created_at, updated_at FROM socialhub.twitter_account_access_tokens
WHERE organisation_group_id=($1) and user_email=($2)
`

type FindTwitterAccountAccessTokenParams struct {
	OrganisationGroupID string `json:"organisation_group_id"`
	UserEmail           string `json:"user_email"`
}

func (q *Queries) FindTwitterAccountAccessToken(ctx context.Context, arg FindTwitterAccountAccessTokenParams) (SocialhubTwitterAccountAccessToken, error) {
	row := q.db.QueryRowContext(ctx, findTwitterAccountAccessToken, arg.OrganisationGroupID, arg.UserEmail)
	var i SocialhubTwitterAccountAccessToken
	err := row.Scan(
		&i.OrganisationGroupID,
		&i.UserEmail,
		&i.TwitterID,
		&i.AccessToken,
		&i.Scope,
		&i.ExpiresAt,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const saveTwitterAccessToken = `-- name: SaveTwitterAccessToken :one
INSERT INTO socialhub.twitter_account_access_tokens(
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
    RETURNING user_email, scope
`

type SaveTwitterAccessTokenParams struct {
	OrganisationGroupID string    `json:"organisation_group_id"`
	UserEmail           string    `json:"user_email"`
	AccessToken         string    `json:"access_token"`
	Scope               string    `json:"scope"`
	ExpiresAt           time.Time `json:"expires_at"`
}

type SaveTwitterAccessTokenRow struct {
	UserEmail string `json:"user_email"`
	Scope     string `json:"scope"`
}

func (q *Queries) SaveTwitterAccessToken(ctx context.Context, arg SaveTwitterAccessTokenParams) (SaveTwitterAccessTokenRow, error) {
	row := q.db.QueryRowContext(ctx, saveTwitterAccessToken,
		arg.OrganisationGroupID,
		arg.UserEmail,
		arg.AccessToken,
		arg.Scope,
		arg.ExpiresAt,
	)
	var i SaveTwitterAccessTokenRow
	err := row.Scan(&i.UserEmail, &i.Scope)
	return i, err
}