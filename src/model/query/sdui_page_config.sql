-- name: PageService_createPageLayoutConfig :one
INSERT INTO page_service.p_page_layout_config(config)
VALUES ($1)
RETURNING page_id, config;

-- name: PageService_getPageLayoutConfig :one
SELECT config, datasource_service FROM page_service.p_page_layout_config
WHERE page_id=($1);