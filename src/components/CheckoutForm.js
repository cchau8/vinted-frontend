import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
const CheckoutForm = ({ amount, title, token, userId }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [completed, setCompleted] = useState(false);
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const cardElement = elements.getElement(CardElement);
			const stripeResponse = await stripe.createToken(cardElement, {
				name: userId,
			});
			console.log(stripeResponse);
			const stripeToken = stripeResponse.token.id;
			const response = await axios.post(
				"https://vinted-api-cedric-chau.herokuapp.com/pay",
				{
					stripeToken: stripeToken,
					amount: amount * 100,
					title: title,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response.data);
			// Si la réponse du serveur est favorable, la transaction a eu lieu
			if (response.data.status === "succeeded") {
				setCompleted(true);
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<>
			{!completed ? (
				<form onSubmit={handleSubmit} className="card-form">
					<CardElement />
					<button type="submit">Valider</button>
				</form>
			) : (
				<div className="payment-success">
					Paiement effectué pour <span>{title}</span> d'un montant de{" "}
					<span>{amount}</span> €
				</div>
			)}
		</>
	);
};

export default CheckoutForm;
