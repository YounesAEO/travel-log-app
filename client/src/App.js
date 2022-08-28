import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { fetchLogEntries } from './api';

const { useEffect, useState } = React;

function App() {
	const [entries, setEntries] = useState([]);
	const [viewState, setViewState] = useState({
		longitude: -100,
		latitude: 40,
		zoom: 3.5,
	});
	const [showPopup, setShowPopup] = useState({});

	useEffect(() => {
		(async () => {
			const entries = await fetchLogEntries();
			setEntries(entries);
		})();
	}, []);

	return (
		<Map
			{...viewState}
			onMove={(evt) => setViewState(evt.viewState)}
			style={{ width: '100vw', height: '100vh' }}
			mapStyle="mapbox://styles/younesaeo/cl7byjp7k002q14mr8ovau2zo"
			mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
			{entries.map((entry, index) => {
				return (
					<>
						<Marker
							key={`marker${index}`}
							longitude={entry?.longitude}
							latitude={entry?.latitude}
							anchor="bottom">
							<div
								onClick={() =>
									setShowPopup({
										[entry?._id?.toString()]: true,
									})
								}>
								<svg
									viewBox="0 0 24 24"
									style={{
										width: '24px',
										height: '24px',
										stroke: '#96f97b',
									}}
									stroke="currentColor"
									strokeWidth="2"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
									<circle cx="12" cy="10" r="3"></circle>
								</svg>
							</div>
						</Marker>
						{showPopup[entry?._id?.toString()] ? (
							<Popup
								key={`popup${index}`}
								longitude={entry?.longitude}
								latitude={entry?.latitude}
								closeButton={true}
								closeOnClick={false}
								onClose={() => setShowPopup({})}>
								<div className="popup">
									<h3>{entry?.title}</h3>
									<p>{entry?.description}</p>
									<small>
										Visited on:{' '}
										{new Date(
											entry?.visitDate
										).toLocaleDateString()}
									</small>
								</div>
							</Popup>
						) : null}
					</>
				);
			})}
		</Map>
	);
}

export default App;
