import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import Hero from "../components/Hero";
import Loading from "../components/Loading";
// import banner from ;

const Home = ({ input, products, setProducts, sort, range }) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let targetUrl = "https://vinted-api-cedric-chau.herokuapp.com/offers";
				const title = input ? `title=${input}&` : "";
				const sortBy = sort ? "sort=price-desc&" : "sort=price-asc&";
				const priceMin = `priceMin=${range[0]}&`;
				const priceMax = `priceMax=${range[1]}&`;
				if (title || sortBy || priceMin || priceMax) {
					targetUrl = `${targetUrl}?${title}${sortBy}${priceMin}${priceMax}`;
				}
				const response = await axios.get(`${targetUrl}page=1&limit=20`);
				setProducts(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, [setProducts, input, sort, range]);

	return (
		<>
			<Hero />
			{isLoading ? (
				<Loading />
			) : (
				<main>
					<section>
						<h2>Fil d'actualité</h2>
						<div className="products-container">
							{products.offers.map((el, i) => {
								return (
									<Link to={`/offer/${el._id}`} key={i}>
										<ProductItem item={el} />
									</Link>
								);
							})}
						</div>
					</section>
				</main>
			)}
		</>
	);
};

export default Home;
