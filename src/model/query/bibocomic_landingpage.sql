-- name: BiboComic_LandingPage_SaveUserForEarlyAccess :one
INSERT INTO p_bibocomic.p_users_early_access_signups(email) VALUES ($1) 
RETURNING email;
