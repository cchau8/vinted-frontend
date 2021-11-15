import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import "../styles/filters.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/slider.css";

const Filters = ({ sort, setSort, range, setRange, setPage }) => {
	const handleChange = (event, newValue) => {
		setRange(newValue);
		setPage(1);
	};

	return (
		<div className="filters">
			<FormControlLabel
				className="sort"
				color="primary"
				control={
					<Switch
						onClick={() => {
							setSort(!sort);
							setPage(1);
						}}
						color="primary"
					/>
				}
				label={
					sort ? (
						<FontAwesomeIcon icon="sort-amount-up" />
					) : (
						<FontAwesomeIcon icon="sort-amount-down-alt" />
					)
				}
			/>
			<div className="slider-container">
				<span>Prix entre :</span>
				<Slider
					className="slider"
					getAriaLabel={() => "Minimum distance"}
					onChangeCommitted={handleChange}
					valueLabelDisplay="on"
					disableSwap
					defaultValue={[10, 100]}
					min={0}
					max={500}
				/>
			</div>
		</div>
	);
};

export default Filters;
