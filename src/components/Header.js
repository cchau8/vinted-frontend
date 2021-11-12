import React from "react";
import { useState } from "react";
import "../styles/header.css";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import logo from "../assets/Vinted-logo.svg.png";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";

const Header = ({ token, setUser, setInput, sort, setSort, range, setRange }) => {
	const [showSignUp, setShowSignUp] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const navigate = useNavigate();
	const handleChange = (event, newValue) => {
		setRange(newValue);
	};
	return (
		<header>
			<div>
				<a href="/">
					<img src={logo} alt="vinted" />
				</a>
				<div className="filters">
					<FormControlLabel
						control={
							<Switch
								onClick={() => {
									setSort(!sort);
								}}
							/>
						}
						label={sort ? "Prix croissant" : "Prix décroissant"}
					/>
					<Slider
						getAriaLabel={() => "Minimum distance"}
						onChangeCommitted={handleChange}
						valueLabelDisplay="on"
						// getAriaValueText={valuetext}
						disableSwap
						defaultValue={[10, 100]}
						min={0}
						max={500}
					/>

					<input
						type="text"
						placeholder="Rechercher des articles"
						onChange={(e) => setInput(e.target.value)}
					/>
				</div>

				<FontAwesomeIcon icon="search" />
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
