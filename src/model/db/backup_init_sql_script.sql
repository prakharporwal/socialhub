create schema IF NOT EXISTS socialhub;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS socialhub.accounts
(
    "id"          BIGSERIAL PRIMARY KEY,
    "owner_email" varchar     NOT NULL UNIQUE,
    "balance"     BIGINT      NOT NULL,
    "currency"    varchar     NOT NULL,
    "created_at"  timestamptz NOT NULL DEFAULT NOW(),
    "created_by"  varchar     NOT NULL,
    "updated_at"  timestamptz NOT NULL DEFAULT NOW()
    );


CREATE TABLE IF NOT EXISTS socialhub.users
(
    user_id       BIGSERIAL NOT NULL,
    username      varchar        NOT NULL,
    user_email    varchar UNIQUE NOT NULL,
    organisation_group_id varchar NOT NULL,
    password_hash varchar        NOT NULL,
    is_verified   boolean        NOT NULL DEFAULT false,
    created_at    timestamptz    NOT NULL DEFAULT now(),
    updated_at    timestamptz    NOT NULL DEFAULT now(),
    PRIMARY KEY(user_email,organisation_group_id)
);

CREATE TABLE IF NOT EXISTS socialhub.organisation_group
(
    organisation_group_id varchar UNIQUE NOT NULL,
    organisation_name     varchar UNIQUE NOT NULL,
    created_by            varchar        NOT NULL,
    created_at            timestamptz    NOT NULL DEFAULT now(),
    updated_at            timestamptz    NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS socialhub.user_role
(
    user_id               BIGSERIAL PRIMARY KEY,
    user_email            varchar     NOT NULL,
    assigned_role         varchar     NOT NULL,
    organisation_group_id varchar     NOT NULL,
    permissions           varchar     NOT NULL,
    created_by            varchar     NOT NULL,
    created_at            timestamptz NOT NULL DEFAULT now(),
    updated_at            timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS socialhub.linkedin_scheduled_user_posts(
    scheduled_post_id varchar PRIMARY KEY,
    account_id        BIGSERIAL   NOT NULL,
    author_urn        varchar     NOT NULL,
    post_id_on_linkedin  varchar     NOT NULL,
    post_json_string  varchar     NOT NULL,
    post_type         varchar     NOT NULL,
    scheduled_time    timestamptz NOT NULL,
    status            varchar     NOT NULL,
    created_by        varchar     NOT NULL,
    created_at        timestamptz NOT NULL DEFAULT now(),
    updated_at        timestamptz NOT NULL DEFAULT now()
);

-- setting trigger to update timestamp accounts table
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON socialhub.linkedin_scheduled_user_posts
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

CREATE INDEX ON socialhub.accounts ("owner_email");

CREATE INDEX ON socialhub.user_role ("user_email");

CREATE INDEX ON socialhub.users ("username");

ALTER TABLE socialhub.user_role
    ADD FOREIGN KEY ("user_email") REFERENCES socialhub.users ("user_email");

ALTER TABLE socialhub.user_role
    ADD FOREIGN KEY ("organisation_group_id") REFERENCES socialhub.organisation_group ("organisation_group_id");

-- updated at timestamp function
CREATE
OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at
= NOW();
RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- setting trigger to update timestamp accounts table
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON socialhub.accounts
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();


-- setting trigger to update timestamp user table
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON socialhub.users
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

-- setting trigger to update timestamp accounts table
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON socialhub.user_role
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();


-- setting trigger to update timestamp accounts table
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON socialhub.organisation_group
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();


CREATE TABLE IF NOT EXISTS socialhub.linkedin_account_access_tokens
(
    organisation_group_id varchar     NOT NULL,
    user_email            varchar     NOT NULL,
    linkedin_urn          varchar     NOT NULL DEFAULT '',
    access_token          varchar     NOT NULL,
    token_scope           varchar     NOT NULL,
    expires_at            timestamptz NOT NULL,
    created_at            timestamptz NOT NULL DEFAULT now(),
    updated_at            timestamptz not null default now(),
    PRIMARY KEY (organisation_group_id, user_email)
);

-- setting trigger to update timestamp accounts table
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON socialhub.linkedin_account_access_tokens
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();


CREATE TABLE IF NOT EXISTS socialhub.twitter_account_access_tokens
(
    organisation_group_id varchar     NOT NULL,
    user_email            varchar     NOT NULL,
    twitter_id          varchar     NOT NULL DEFAULT '',
    twitter_username    varchar     NOT NULL DEFAULT '',
    access_token          varchar     NOT NULL,
    refresh_token          varchar     NOT NULL,
    token_scope                 varchar     NOT NULL,
    token_type              varchar     NOT NULL,
    expires_at            timestamptz NOT NULL,
    created_at            timestamptz NOT NULL DEFAULT now(),
    updated_at            timestamptz not null default now(),
    PRIMARY KEY (organisation_group_id, user_email)
);

-- setting trigger to update timestamp accounts table
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON socialhub.twitter_account_access_tokens
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();



-- sessions table
CREATE TABLE IF NOT EXISTS socialhub.sessions(
    session_id uuid NOT NULL PRIMARY KEY ,
    email varchar NOT NULL ,
    user_agent varchar NOT NULL,
    client_ip varchar NOT NULL,
    refresh_token varchar NOT NULL ,
    expires_at timestamptz NOT NULL ,
    is_blocked bool NOT NULL default false,
    created_at timestamptz NOT NULL DEFAULT NOW()
);


-- user_password_reset_tokens table
CREATE TABLE IF NOT EXISTS socialhub.user_password_reset_tokens(
    organisation_group_id varchar NOT NULL,
    user_id                varchar     NOT NULL,
    token                  varchar     NOT NULL UNIQUE,
    expires_at             timestamptz NOT NULL,
    is_expired             bool        NOT NULL default false,
    requested_by_client_ip varchar     NOT NULL,
    created_at             timestamptz NOT NULL DEFAULT NOW(),
    updated_at             timestamptz not null default now(),
    PRIMARY KEY (organisation_group_id,user_id, token)
);

-- setting trigger to update timestamp accounts table
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON socialhub.user_password_reset_tokens
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();


CREATE TABLE IF NOT EXISTS socialhub.google_signup_access_token(
    organisation_group_id varchar NOT NULL,
    user_id                varchar     NOT NULL,
    token                  varchar     NOT NULL UNIQUE,
    expires_at             timestamptz NOT NULL,
    is_expired             bool        NOT NULL default false,
    requested_by_client_ip varchar     NOT NULL,
    created_at             timestamptz NOT NULL DEFAULT NOW(),
    updated_at             timestamptz not null default now(),
    PRIMARY KEY (organisation_group_id,user_id, token)
);

-- not in prod yet
CREATE TABLE IF NOT EXISTS socialhub.app_account_oauth2_access_tokens
(
    organisation_group_id      varchar     NOT NULL,
    user_email                 varchar     NOT NULL,
    app_name                   varchar     NOT NULL,
    app_user_identification_id varchar     NOT NULL DEFAULT '',
    access_token               varchar     NOT NULL,
    refresh_token              varchar     NOT NULL,
    token_scope                varchar     NOT NULL,
    expires_at                 timestamptz NOT NULL,
    created_at                 timestamptz NOT NULL DEFAULT now(),
    updated_at                 timestamptz not null default now(),
    PRIMARY KEY (organisation_group_id, user_email)
);

-- setting trigger to update timestamp accounts table
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON socialhub.app_account_oauth2_access_tokens
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

----------------------------------------------------------------

----------------------------------------------------------------
-- BIBOCOMIC
create schema IF NOT EXISTS p_bibocomic;

-- table for Users Early Access Signups
CREATE TABLE IF NOT EXISTS p_bibocomic.p_users_early_access_signups
(
    email varchar NOT NULL DEFAULT '',
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY(email)
);


---------------- SDUI page service
create schema IF NOT EXISTS page_service;

CREATE TABLE IF NOT EXISTS page_service.p_page_layout_config (
    page_id BIGSERIAL NOT NULL PRIMARY KEY,
    config varchar NOT NULL DEFAULT '',
    datasource_service varchar,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    created_by varchar NOT NULL DEFAULT ''
);

CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON page_service.p_page_layout_config
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

---------------- SDUI product service
create schema IF NOT EXISTS product_service;

CREATE TABLE IF NOT EXISTS product_service.p_listings (
    listing_id varchar NOT NULL PRIMARY KEY,
    product_id varchar NOT NULL DEFAULT '',
    seller_id bigint NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    created_by varchar NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS product_service.p_product_details (
    product_id varchar NOT NULL PRIMARY KEY,
    product_name varchar NOT NULL DEFAULT '',
    product_description varchar NOT NULL DEFAULT '',
    highlights varchar NOT NULL DEFAULT '',
    brand varchar NOT NULL DEFAULT '',
    variants varchar NOT NULL DEFAULT '',
    img_url varchar NOT NULL DEFAULT '',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    created_by varchar NOT NULL DEFAULT ''
);

CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON product_service.p_listings
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON product_service.p_product_details
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();


---------------- Seller Details : Account seller systems

CREATE SCHEMA IF NOT EXISTS seller_systems;

CREATE TABLE seller_systems.p_seller_account
(
    seller_id BIGSERIAL PRIMARY KEY,
    seller_name varchar NOT NULL DEFAULT '',
    seller_img_url varchar NOT NULL DEFAULT '',
    seller_email_id varchar NOT NULL UNIQUE DEFAULT '',
    seller_contact_number varchar NOT NULL DEFAULT '',
    is_verified boolean NOT NULL DEFAULT false,
    gst_number varchar,
    created_by varchar NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE seller_systems.p_seller_account
    IS 'seller user id and other account details';

CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON seller_systems.p_seller_account
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();


-- table for user post details when he submits first
-- this is the source of truth for the post
CREATE TABLE IF NOT EXISTS socialhub.p_post_info (
    post_id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    post_type varchar NOT NULL,
    creation_status varchar NOT NULL, -- DRAFT, COMPLETED
    post_url varchar NOT NULL,
    post_text varchar NOT NULL,
    post_img_url varchar,
    post_video_url varchar,
    is_deleted boolean NOT NULL DEFAULT false, -- auditing fields
    user_email varchar NOT NULL,
    organisation_group_id varchar NOT NULL,
    created_by varchar NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON socialhub.p_post_info
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
    
CREATE INDEX idx_user_email ON socialhub.p_post_info (user_email);

-- table for user post details when he submits first
-- this is the source of truth for the post
CREATE TABLE IF NOT EXISTS socialhub.p_social_account_posting_history (
    id BIGSERIAL PRIMARY KEY,
    post_id uuid NOT NULL,
    social_account_id varchar NOT NULL,
    scheduled_time timestamptz NOT NULL,
    posting_status varchar NOT NULL,
    created_by varchar NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    FOREIGN KEY (post_id) REFERENCES socialhub.p_post_info(post_id)
);

CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON socialhub.p_social_account_posting_history
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

-- Add indexes for performance
CREATE INDEX idx_post_id ON socialhub.p_social_account_posting_history (post_id);
CREATE INDEX idx_social_account_id ON socialhub.p_social_account_posting_history (social_account_id);