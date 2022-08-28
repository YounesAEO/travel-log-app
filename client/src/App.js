import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { fetchLogEntries } from './api';
import LogEntryForm from './LogEntryForm';

const { useEffect, useState } = React;

function App() {
	const [entries, setEntries] = useState([]);
	const [viewState, setViewState] = useState({
		longitude: -100,
		latitude: 40,
		zoom: 3.5,
	});
	const [showPopup, setShowPopup] = useState({});
	const [clickLocation, setClickLocation] = useState(null);

	useEffect(() => {
		(async () => {
			const entries = await fetchLogEntries();
			setEntries(entries);
		})();
	}, []);

	const addNewEntry = (event) => {
		const { lng: longitude, lat: latitude } = event.lngLat;
		setClickLocation({ longitude, latitude });
	};

	return (
		<Map
			{...viewState}
			doubleClickZoom={false}
			onMove={(evt) => setViewState(evt.viewState)}
			style={{ width: '100vw', height: '100vh' }}
			onDblClick={addNewEntry}
			mapStyle="mapbox://styles/younesaeo/cl7byjp7k002q14mr8ovau2zo"
			mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
			{/* list all entries */}
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
								<Pin />
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

			{/* Create a new entry */}
			{clickLocation ? (
				<>
					<Marker
						latitude={clickLocation?.latitude}
						longitude={clickLocation?.longitude}>
						<div>
							<Pin filled={true} />
						</div>
					</Marker>
					<Popup
						longitude={clickLocation?.longitude}
						latitude={clickLocation?.latitude}
						closeButton={true}
						closeOnClick={false}
						onClose={() => setClickLocation(null)}>
						<div className="popup">
							<LogEntryForm />
						</div>
					</Popup>
				</>
			) : null}
		</Map>
	);
}

function Pin({
	height = '24px',
	width = '24px',
	color = '#96f97b',
	filled = false,
}) {
	return filled ? (
		<svg
			style={{
				width,
				height,
				fill: color,
			}}
			version="1.1"
			id="Layer_1"
			x="0px"
			y="0px"
			viewBox="0 0 512 512">
			<g>
				<g>
					<path
						d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
					/>
				</g>
			</g>
		</svg>
	) : (
		<svg
			viewBox="0 0 24 24"
			style={{
				width,
				height,
				stroke: color,
			}}
			stroke="currentColor"
			strokeWidth="2"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
			<circle cx="12" cy="10" r="3"></circle>
		</svg>
	);
}

export default App;
