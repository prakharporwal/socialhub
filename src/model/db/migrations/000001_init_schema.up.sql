create schema IF NOT EXISTS socialhub;


CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";


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
    token_scope                 varchar     NOT NULL,
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
    token_scope                 varchar     NOT NULL,
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