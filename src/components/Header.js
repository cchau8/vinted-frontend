import React from "react";
import "../styles/header.css";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import logo from "../assets/Vinted-logo.svg.png";
const Header = ({ token, setToken }) => {
	const navigate = useNavigate();
	const handleSignOut = () => {
		setToken("");
		Cookies.remove("token");
		navigate("/");
	};
	return (
		<header>
			<div>
				<a href="/">
					<img src={logo} alt="" />
				</a>
				<nav>
					{token ? (
						<button onClick={handleSignOut} className="signout">
							Se déconnecter
						</button>
					) : (
						<div>
							<button onClick={() => navigate("/signup")}>S'inscrire</button>

							<button
								onClick={() => {
									navigate("/login");
								}}
							>
								Se connecter
							</button>
						</div>
					)}
					<button className="sell">Vends tes articles</button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
