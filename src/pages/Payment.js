import "../styles/payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Navigate } from "react-router";
import { useLocation } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
const stripePromise = loadStripe(
	"pk_test_51JwPeWH1S9Sx4yiiA1Ci4Dmnwtxk0FF7FrLWljJY5BCtbYb9ZdSRfsyDDIyMbzCdurc4V7YJC6rAFBffgrceASHB00f4refXtP"
);
const Payment = ({ token, userId }) => {
	const [productData, setProductData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation();
	const buyersFee = 0.4;
	const shippingFee = 0.8;
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://vinted-api-cedric-chau.herokuapp.com/offer/${location.state.id}`
			);
			setProductData(response.data);
			setIsLoading(false);
		};
		fetchData();
	}, [location.state.id]);

	return token ? (
		isLoading ? (
			<Loading />
		) : (
			<div className="payment-page">
				<div className="payment">
					<h5>Résumé de la commande</h5>
					<div className="recap">
						<div>
							<span>
								Commande : <br />- {productData.product_name}
							</span>
							<span>{productData.product_price.toFixed(2)} €</span>
						</div>
						<div>
							<span>Frais protection acheteurs</span>
							<span>{buyersFee.toFixed(2)} €</span>
						</div>
						<div>
							<span>Frais de ports</span>
							<span>{shippingFee.toFixed(2)} €</span>
						</div>
						<div className="total">
							<span>Total</span>
							<span>
								{(productData.product_price + shippingFee + buyersFee).toFixed(2)} €
							</span>
						</div>
					</div>

					<div className="payment-block">
						<div>
							<p>
								Il ne vous reste plus qu'une étape pour vous offrir{" "}
								<span>{productData.product_name}</span>. Vous allez payer un total
								de{" "}
								<span>
									{(productData.product_price + shippingFee + buyersFee).toFixed(
										2
									)}{" "}
									€
								</span>{" "}
								(frais de protection et frais de port inclus).
							</p>
						</div>

						<Elements stripe={stripePromise} className="card-input">
							<CheckoutForm
								amount={(
									productData.product_price +
									shippingFee +
									buyersFee
								).toFixed(2)}
								title={productData.product_name}
								token={token}
								userId={userId}
							/>
						</Elements>
					</div>
				</div>
			</div>
		)
	) : (
		<Navigate to="/login" />
	);
};

export default Payment;
