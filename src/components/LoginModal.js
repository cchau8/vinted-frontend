import React from "react";
import axios from "axios";
import "../styles/signup-modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useRef, useState } from "react";
const LoginModal = ({ setShowLogin, showLogin, setUser }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const modalRef = useRef(null);

	// function to close the modal and turn off scroll
	const closeModal = () => {
		setShowLogin(false);
		const body = document.querySelector("body");
		body.style.overflow = "auto";
	};

	// handleSubmit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://vinted-api-cedric-chau.herokuapp.com/user/login",
				{
					email: email,
					password: password,
				}
			);
			setUser(response.data.token);
			closeModal();
		} catch (error) {
			console.log(error.message);
		}
	};

	// Detect click outside the modal
	useEffect(() => {
		const handler = (e) => {
			if (showLogin && !modalRef.current?.contains(e.target)) {
				setShowLogin(false);
				const body = document.querySelector("body");
				body.style.overflow = "auto";
			}
		};
		window.addEventListener("click", handler);
		return () => {
			window.removeEventListener("click", handler);
		};
	}, [showLogin, setShowLogin]);

	return (
		<div className="modal-container">
			<div className="modal" ref={modalRef}>
				<button
					onClick={() => {
						closeModal();
					}}
					className="close-modal"
				>
					<FontAwesomeIcon icon="times" />
				</button>
				<form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
					method="POST"
					className="signup"
				>
					<span>Se connecter</span>

					<input
						placeholder="E-Mail"
						type="email"
						name="email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<input
						placeholder="Password"
						type="password"
						name="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<input type="submit" value="Se connecter" />
				</form>
			</div>
		</div>
	);
};

export default LoginModal;
