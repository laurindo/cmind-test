import React from 'react';
import './App.css';
import Drawing from "./container/Drawing";

function App() {
	return (
		<div className="App">
			<Drawing id="container" width={800} height={600}/>
		</div>
	);
}

export default App;
