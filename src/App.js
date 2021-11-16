import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Footer from "./components/Footer";

import { useState } from "react";
import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faTimes,
	faSearch,
	faSortAmountUp,
	faSortAmountDownAlt,
	faPlus,
	faBars,
} from "@fortawesome/free-solid-svg-icons";
import Payment from "./pages/Payment";

library.add(faTimes, faSearch, faSortAmountUp, faSortAmountDownAlt, faPlus, faBars);

function App() {
	const [token, setToken] = useState(Cookies.get("token") || null);
	const [products, setProducts] = useState([]);
	const [input, setInput] = useState("");
	const [sort, setSort] = useState(false);
	const [range, setRange] = useState([0, 10000]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [userId, setUserId] = useState("");

	const setUser = (token) => {
		if (token) {
			Cookies.set("token", token);
		} else {
			Cookies.remove("token");
		}
		setToken(token);
	};

	return (
		<Router>
			<Header token={token} setUser={setUser} setInput={setInput} setUserId={setUserId} />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							products={products}
							setProducts={setProducts}
							input={input}
							sort={sort}
							setSort={setSort}
							range={range}
							setRange={setRange}
							limit={limit}
							setLimit={setLimit}
							page={page}
							setPage={setPage}
						/>
					}
				/>
				<Route
					path="/signup"
					element={<SignUp setUser={setUser} setUserId={setUserId} />}
				/>
				<Route path="/login" element={<Login setUser={setUser} setUserId={setUserId} />} />
				<Route path="/offer/:offerId" element={<Offer />} />
				<Route path="/publish" element={<Publish token={token} />} />
				<Route path="/payment" element={<Payment token={token} userId={userId} />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
