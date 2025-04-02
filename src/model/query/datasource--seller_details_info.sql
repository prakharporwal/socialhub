-- name: SellerService_fetchSellerDetailsForListing :one
SELECT l.listing_id, s.seller_id, s.seller_name, is_verified
FROM seller_systems.p_seller_account s JOIN product_service.p_listings l
ON s.seller_id=l.seller_id
WHERE l.listing_id=($1);