import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/atoms/Router";
import AllContextProvider from "./context/AllContextProvider";

function App() {
	return (
		<AllContextProvider>
			<div className='split-app'>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</div>
		</AllContextProvider>
	);
}

export default App;
