import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = ({ setUser }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

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
			navigate("/");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="signup-page">
			<form
				className="signup"
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<span>Se connecter</span>
				<input
					placeholder="Email"
					type="email"
					name=""
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					type="password"
					placeholder="Password"
					name=""
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<input type="submit" value="Se connecter" />
			</form>
		</div>
	);
};

export default Login;
