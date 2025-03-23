-- name: ProductService_fetchProductListingDetailsForProductPage :one
SELECT listing_id, b.product_id, seller_id, product_name, brand, highlights, product_description
FROM product_service.p_listings a JOIN product_service.p_product_details b 
ON a.product_id=b.product_id
WHERE (a.listing_id=($1) AND b.product_id=($2));