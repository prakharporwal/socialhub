// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.17.2

package db

import (
	"time"

	"github.com/google/uuid"
)

type Session struct {
	SessionID    uuid.UUID `json:"session_id"`
	Email        string    `json:"email"`
	UserAgent    string    `json:"user_agent"`
	ClientIp     string    `json:"client_ip"`
	RefreshToken string    `json:"refresh_token"`
	ExpiresAt    time.Time `json:"expires_at"`
	IsBlocked    bool      `json:"is_blocked"`
	CreatedAt    time.Time `json:"created_at"`
}

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
	AccessToken         string    `json:"access_token"`
	Scope               string    `json:"scope"`
	ExpiresAt           time.Time `json:"expires_at"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
}

type SocialhubLinkedinScheduledUserPost struct {
	ScheduledPostID string    `json:"scheduled_post_id"`
	AccountID       int64     `json:"account_id"`
	LinkedinUrn     string    `json:"linkedin_urn"`
	PostID          string    `json:"post_id"`
	ScheduledTime   time.Time `json:"scheduled_time"`
	Status          string    `json:"status"`
	CreatedBy       string    `json:"created_by"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

type SocialhubOrganisationGroup struct {
	OrganisationGroupID string    `json:"organisation_group_id"`
	OrganisationName    string    `json:"organisation_name"`
	CreatedBy           string    `json:"created_by"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
}

type SocialhubUser struct {
	UserID       int64     `json:"user_id"`
	Username     string    `json:"username"`
	UserEmail    string    `json:"user_email"`
	PasswordHash string    `json:"password_hash"`
	IsVerified   bool      `json:"is_verified"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
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