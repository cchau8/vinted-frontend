import React from "react";
import "../styles/publish.css";
import { useState } from "react";
import axios from "axios";
import { Checkbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Publish = ({ token }) => {
	const [file, setFile] = useState();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [brand, setBrand] = useState("");
	const [size, setSize] = useState("");
	const [color, setColor] = useState("");
	const [condition, setCondition] = useState("");
	const [location, setLocation] = useState("");
	const [price, setPrice] = useState(0);
	const [exchange, setExchange] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("picture", file);
		formData.append("title", title);
		formData.append("description", description);
		formData.append("brand", brand);
		formData.append("size", size);
		formData.append("color", color);
		formData.append("condition", condition);
		formData.append("location", location);
		formData.append("price", price);
		try {
			const response = await axios.post(
				"https://vinted-api-cedric-chau.herokuapp.com/offer/publish",
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-type": "multipart/form-data",
					},
				}
			);
			console.log(response.data);
		} catch (error) {
			console.log(error.message);
		}
	};
	const imageChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	return (
		<div className="publish-page">
			<form onSubmit={handleSubmit} className="publish">
				<div className="picture">
					{!file && (
						<div className="inputfile">
							<input type="file" id="file" name="pictures" onChange={imageChange} />
							<label for="file">
								<FontAwesomeIcon icon="plus" />
								Ajouter une photo
							</label>
						</div>
					)}

					{file && (
						<div className="preview">
							<img src={URL.createObjectURL(file)} alt="preview" />
							<button
								onClick={() => {
									setFile();
								}}
							>
								x
							</button>
						</div>
					)}
				</div>
				<div className="publish-main">
					<div>
						<h4>Titre</h4>
						<input
							required="required"
							type="text"
							placeholder="ex: Chemise Sézane verte"
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
					</div>
					<div>
						<h4>Décris ton article</h4>
						<textarea
							required="required"
							type="text"
							placeholder="ex: Porté quelques fois seulement, taille correctement"
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
					</div>
				</div>
				<div>
					<div>
						<h4>Marque</h4>
						<input
							type="text"
							required="required"
							placeholder="ex: Uniqlo, Zara"
							onChange={(e) => {
								setBrand(e.target.value);
							}}
						/>
					</div>
					<div>
						<h4>Taille</h4>
						<input
							type="text"
							required="required"
							placeholder="ex: L / 40 / 12"
							onChange={(e) => {
								setSize(e.target.value);
							}}
						/>
					</div>
					<div>
						<h4>Couleur</h4>
						<input
							type="text"
							required="required"
							placeholder="ex: Fushia"
							onChange={(e) => {
								setColor(e.target.value);
							}}
						/>
					</div>
					<div>
						<h4>Etat</h4>
						<input
							type="text"
							required="required"
							placeholder="ex: Neuf avec étiquette"
							onChange={(e) => {
								setCondition(e.target.value);
							}}
						/>
					</div>
					<div>
						<h4>Lieu</h4>
						<input
							type="text"
							required="required"
							placeholder="ex: Paris"
							onChange={(e) => {
								setLocation(e.target.value);
							}}
						/>
					</div>
				</div>
				<div className="price">
					<div>
						<h4>Prix</h4>
						<input
							type="number"
							required="required"
							placeholder="0,00€"
							onChange={(e) => {
								setPrice(Number(e.target.value));
							}}
						/>
					</div>
					<div>
						<FormControlLabel
							control={
								<Checkbox
									checked={exchange}
									onChange={() => {
										setExchange(!exchange);
									}}
								/>
							}
							label="Je suis intéressé(e) par les échanges"
						/>
					</div>
				</div>
				<input type="submit" value="Ajouter" />
			</form>
		</div>
	);
};

export default Publish;
