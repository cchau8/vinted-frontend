import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import Hero from "../components/Hero";
import Loading from "../components/Loading";
import Filters from "../components/Filters";
import { Button } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Stack } from "@mui/material";
const Home = ({
	input,
	products,
	setProducts,
	sort,
	setSort,
	range,
	setRange,
	page,
	setPage,
	limit,
	setLimit,
}) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let targetUrl = "https://vinted-api-cedric-chau.herokuapp.com/offers";
				const title = input ? `title=${input}&` : "";
				const sortBy = sort ? "sort=price-desc&" : "sort=price-asc&";
				const priceMin = `priceMin=${range[0]}&`;
				const priceMax = `priceMax=${range[1]}&`;
				const currentPage = `page=${page}&`;
				const limitProducts = `limit=${limit}&`;
				targetUrl = `${targetUrl}?${title}${sortBy}${priceMin}${priceMax}${currentPage}${limitProducts}`;

				const response = await axios.get(`${targetUrl}`);
				setProducts(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, [setProducts, input, sort, range, page, limit]);

	return (
		<>
			<Hero />
			<main>
				<section>
					<h2>Fil d'actualité</h2>
					<Filters
						sort={sort}
						setSort={setSort}
						range={range}
						setRange={setRange}
						setPage={setPage}
					/>
					{isLoading ? (
						<Loading />
					) : (
						<>
							<div className="products-container">
								{products.offers.map((el, i) => {
									return (
										<Link to={`/offer/${el._id}`} key={i}>
											<ProductItem item={el} />
										</Link>
									);
								})}
							</div>
							<div>
								<div className="pages">
									<Stack direction="row" spacing={1}>
										{[...Array(Math.ceil(products.count / limit))].map(
											(el, i) => {
												return (
													<Button
														variant="outlined"
														key={i + 1}
														size="small"
														onClick={() => setPage(i + 1)}
													>
														{i + 1}
													</Button>
												);
											}
										)}
									</Stack>
									<FormControl sx={{ m: 1, minWidth: 120 }}>
										<InputLabel>Voir plus</InputLabel>
										<Select
											labelId="demo-simple-select-autowidth-label"
											id="demo-simple-select-autowidth"
											autoWidth
											label="Voir plus"
											onChange={(e) => {
												setLimit(Number(e.target.value));
											}}
										>
											<MenuItem value={10}>10</MenuItem>
											<MenuItem value={20}>20</MenuItem>
											<MenuItem value={50}>50</MenuItem>
										</Select>
									</FormControl>
								</div>
							</div>
						</>
					)}
				</section>
			</main>
		</>
	);
};

export default Home;
