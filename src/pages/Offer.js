import React from "react";
import "../styles/offer.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const Offer = () => {
	const [productData, setProductData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const { offerId } = useParams();
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://vinted-api-cedric-chau.herokuapp.com/offer/${offerId}`
			);
			setProductData(response.data);
			setIsLoading(false);
		};
		fetchData();
	}, [offerId]);

	return isLoading ? (
		<Loading />
	) : (
		<div className="offer-page">
			<div className="offer-container">
				<div className="offer-img">
					<img src={productData.product_image.url} alt="qthq" />
				</div>
				<div className="offer-details">
					<span className="offer-price">{productData.product_price} €</span>
					<ul className="offer-specs">
						{productData.product_details.map((el, i) => {
							const key = Object.keys(el);
							return (
								<li>
									<span>{key[0].toUpperCase()} : </span>
									<span>{el[key]}</span>
								</li>
							);
						})}
					</ul>

					<div className="offer-info">
						<span>{productData.product_name}</span>
						<p>{productData.product_description}</p>
						<div className="offer-owner">
							{productData.owner.account.avatar && (
								<img src={productData.owner.account.avatar.secure_url} alt="" />
							)}
							<span>Vendu par : {productData.owner.account.username}</span>
						</div>
					</div>
					<button>Acheter</button>
				</div>
			</div>
		</div>
	);
};

export default Offer;
