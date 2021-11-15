import React from "react";
import "../styles/footer.css";

const Footer = () => {
	return (
		<footer>
			<span>
				Made using React & MUI @{" "}
				<a href="lereacteur.io" target="_blank">
					Le Réacteur
				</a>{" "}
				by <a href="github/chau8">Cédric Chau</a>
			</span>
		</footer>
	);
};

export default Footer;
