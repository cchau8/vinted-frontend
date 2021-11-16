import React from "react";
import axios from "axios";
import "../styles/signup-modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useRef, useState, setUserId } from "react";
const SignUpModal = ({ setShowSignUp, showSignUp, setUser }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const modalRef = useRef(null);

	// close modal
	const closeModal = () => {
		setShowSignUp(false);
		const body = document.querySelector("body");
		body.style.overflow = "auto";
	};

	// handle Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://vinted-api-cedric-chau.herokuapp.com/user/signup",
				{
					username: username,
					email: email,
					password: password,
				}
			);
			setUser(response.data.token);
			setUserId(response.data.id);
			closeModal();
		} catch (error) {
			console.log(error.message);
		}
	};

	// close modal on click outside and turn off scroll
	useEffect(() => {
		const handler = (e) => {
			if (showSignUp && !modalRef.current?.contains(e.target)) {
				setShowSignUp(false);
				const body = document.querySelector("body");
				body.style.overflow = "auto";
			}
		};
		window.addEventListener("click", handler);
		return () => {
			window.removeEventListener("click", handler);
		};
	}, [showSignUp, setShowSignUp]);

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
					className="signup"
				>
					<span>S'inscrire</span>
					<input
						placeholder="Username"
						type="text"
						name="username"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
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
					<input type="submit" value="S'inscrire" />
				</form>
			</div>
		</div>
	);
};

export default SignUpModal;
