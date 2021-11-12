import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useState } from "react";
import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes);

function App() {
	const [token, setToken] = useState("");

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
			<Header token={token} setUser={setUser} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUp setUser={setUser} />} />
				<Route path="/login" element={<Login setUser={setUser} />} />
				<Route path="/offer/:offerId" element={<Offer />} />
			</Routes>
		</Router>
	);
}

export default App;
