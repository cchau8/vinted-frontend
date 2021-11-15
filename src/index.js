import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#09aeb7",
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
