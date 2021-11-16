import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const SignUp = ({ setUser, setUserId }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

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
			navigate("/");
		} catch (error) {
			alert("wrong credentials");

			console.log(error.message);
		}
	};

	return (
		<div className="signup-page">
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
	);
};

export default SignUp;
