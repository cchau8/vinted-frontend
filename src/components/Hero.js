import React from "react";
import tear from "../assets/tear.svg";
import "../styles/hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<div className="hero">
			<img src={tear} alt="" />
			<div className="hero-block">
				<div className="hero-content">
					<h1>Prêts à faire du tri dans vos placards ?</h1>
					<button>Vends maintenant</button>
					<Link to="/">Découvrir comment ça marche</Link>
				</div>
			</div>
		</div>
	);
};

export default Hero;
