// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.18.0

package db

import (
	"time"

	"github.com/google/uuid"
)

type SocialhubAccount struct {
	ID         int64     `json:"id"`
	OwnerEmail string    `json:"owner_email"`
	Balance    int64     `json:"balance"`
	Currency   string    `json:"currency"`
	CreatedAt  time.Time `json:"created_at"`
	CreatedBy  string    `json:"created_by"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type SocialhubLinkedinAccountAccessToken struct {
	OrganisationGroupID string    `json:"organisation_group_id"`
	UserEmail           string    `json:"user_email"`
	LinkedinUrn         string    `json:"linkedin_urn"`
	AccessToken         string    `json:"access_token"`
	TokenScope          string    `json:"token_scope"`
	ExpiresAt           time.Time `json:"expires_at"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
}

type SocialhubLinkedinScheduledUserPost struct {
	ScheduledPostID  string    `json:"scheduled_post_id"`
	AccountID        int64     `json:"account_id"`
	AuthorUrn        string    `json:"author_urn"`
	PostIDOnLinkedin string    `json:"post_id_on_linkedin"`
	PostJsonString   string    `json:"post_json_string"`
	PostType         string    `json:"post_type"`
	ScheduledTime    time.Time `json:"scheduled_time"`
	Status           string    `json:"status"`
	CreatedBy        string    `json:"created_by"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

type SocialhubOrganisationGroup struct {
	OrganisationGroupID string    `json:"organisation_group_id"`
	OrganisationName    string    `json:"organisation_name"`
	CreatedBy           string    `json:"created_by"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
}

type SocialhubSession struct {
	SessionID    uuid.UUID `json:"session_id"`
	Email        string    `json:"email"`
	UserAgent    string    `json:"user_agent"`
	ClientIp     string    `json:"client_ip"`
	RefreshToken string    `json:"refresh_token"`
	ExpiresAt    time.Time `json:"expires_at"`
	IsBlocked    bool      `json:"is_blocked"`
	CreatedAt    time.Time `json:"created_at"`
}

type SocialhubTwitterAccountAccessToken struct {
	OrganisationGroupID string    `json:"organisation_group_id"`
	UserEmail           string    `json:"user_email"`
	TwitterID           string    `json:"twitter_id"`
	TwitterUsername     string    `json:"twitter_username"`
	AccessToken         string    `json:"access_token"`
	RefreshToken        string    `json:"refresh_token"`
	TokenScope          string    `json:"token_scope"`
	TokenType           string    `json:"token_type"`
	ExpiresAt           time.Time `json:"expires_at"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
}

type SocialhubUser struct {
	UserID              int64     `json:"user_id"`
	Username            string    `json:"username"`
	UserEmail           string    `json:"user_email"`
	OrganisationGroupID string    `json:"organisation_group_id"`
	PasswordHash        string    `json:"password_hash"`
	IsVerified          bool      `json:"is_verified"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
}

type SocialhubUserPasswordResetToken struct {
	OrganisationGroupID string    `json:"organisation_group_id"`
	UserID              string    `json:"user_id"`
	Token               string    `json:"token"`
	ExpiresAt           time.Time `json:"expires_at"`
	IsExpired           bool      `json:"is_expired"`
	RequestedByClientIp string    `json:"requested_by_client_ip"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
}

type SocialhubUserRole struct {
	UserID              int64     `json:"user_id"`
	UserEmail           string    `json:"user_email"`
	AssignedRole        string    `json:"assigned_role"`
	OrganisationGroupID string    `json:"organisation_group_id"`
	Permissions         string    `json:"permissions"`
	CreatedBy           string    `json:"created_by"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
}
