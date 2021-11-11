import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useState } from "react";
import Cookies from "js-cookie";

function App() {
	const [token, setToken] = useState("");
	if (token) {
		Cookies.set("token", token);
	}
	return (
		<Router>
			<Header token={token} setToken={setToken} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUp setToken={setToken} />} />
				<Route path="/login" element={<Login setToken={setToken} />} />
				<Route path="/offer/:offerId" element={<Offer />} />
			</Routes>
		</Router>
	);
}

export default App;
