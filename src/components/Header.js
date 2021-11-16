import React from "react";
import { useState } from "react";
import "../assets/fonts/stylesheet.css";
import "../styles/header.css";

import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import logo from "../assets/Vinted-logo.svg.png";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const Header = ({ token, setUser, setInput, setUserId }) => {
	const [showSignUp, setShowSignUp] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const navigate = useNavigate();

	return (
		<header>
			<div>
				<Link to="/">
					<img src={logo} alt="vinted" />
				</Link>
				<div className="search">
					<FontAwesomeIcon icon="search" className="search-icon" />
					<input
						type="text"
						placeholder="Rechercher des articles"
						onChange={(e) => setInput(e.target.value)}
					/>
				</div>

				<nav>
					{token ? (
						<button
							onClick={() => {
								setUser(null);
								Cookies.remove("token");
								navigate("/");
							}}
							className="signout"
						>
							Se déconnecter
						</button>
					) : (
						<div>
							<button
								onClick={() => {
									setShowSignUp(true);
									const body = document.querySelector("body");
									body.style.overflow = "hidden";
								}}
							>
								S'inscrire
							</button>

							<button
								onClick={() => {
									setShowLogin(true);
									const body = document.querySelector("body");
									body.style.overflow = "hidden";
								}}
							>
								Se connecter
							</button>
						</div>
					)}
					<button
						onClick={() => {
							token ? navigate("/publish") : navigate("/login");
						}}
						className="sell"
					>
						Vends tes articles
					</button>
				</nav>
			</div>
			{showSignUp && (
				<SignUpModal
					setShowSignUp={setShowSignUp}
					showSignUp={showSignUp}
					setUser={setUser}
					setUserId={setUserId}
				/>
			)}
			{showLogin && (
				<LoginModal
					showLogin={showLogin}
					setShowLogin={setShowLogin}
					setUser={setUser}
					setUserId={setUserId}
				/>
			)}
		</header>
	);
};

export default Header;
