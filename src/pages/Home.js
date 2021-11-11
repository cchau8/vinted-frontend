import React from "react";
import "../styles/home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import banner from "../assets/banner.jpg";

const Home = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"https://vinted-api-cedric-chau.herokuapp.com/offers?page=1&limit=20"
			);
			setData(response.data);
			setIsLoading(false);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return isLoading ? (
		<p>loading</p>
	) : (
		<main>
			<div className="hero">
				<img src={banner} alt="" />
				<div className="hero-content">
					<h1>Prêts à faire du tri dans vos placards ?</h1>
					<button>Vends maintenant</button>
					<Link to="/">Découvrir comment ça marche</Link>
				</div>
				<div className="tear"></div>
			</div>
			<section>
				<h2>Fil d'actualité</h2>
				<div className="products-container">
					{data.offers.map((el, i) => {
						return (
							<Link to={`/offer/${el._id}`} key={i}>
								<ProductItem item={el} />
							</Link>
						);
					})}
				</div>
			</section>
		</main>
	);
};

export default Home;
