import React from "react";

const ProductItem = ({ item }) => {
	return (
		<div className="product-item">
			<div className="owner">
				<span>{item.owner.account.username}</span>
			</div>

			<img src={item.product_image.url} alt="qergq" />

			<div className="product-details">
				<span>{item.product_price} €</span>
				<span>{item.product_details[1].size} €</span>
				<span>{item.product_details[0].brand} €</span>
			</div>
		</div>
	);
};

export default ProductItem;
