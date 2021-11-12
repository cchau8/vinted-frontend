import React from "react";
import { useState } from "react";
import "../styles/header.css";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import logo from "../assets/Vinted-logo.svg.png";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

const Header = ({ token, setUser }) => {
	const [showSignUp, setShowSignUp] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const navigate = useNavigate();

	return (
		<header>
			<div>
				<a href="/">
					<img src={logo} alt="" />
				</a>
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
					<button className="sell">Vends tes articles</button>
				</nav>
			</div>
			{showSignUp && (
				<SignUpModal
					setShowSignUp={setShowSignUp}
					showSignUp={showSignUp}
					setUser={setUser}
				/>
			)}
			{showLogin && (
				<LoginModal showLogin={showLogin} setShowLogin={setShowLogin} setUser={setUser} />
			)}
		</header>
	);
};

export default Header;
