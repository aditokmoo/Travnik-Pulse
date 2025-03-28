import { createContext, useContext, useEffect, useState } from 'react';

const context = createContext();

export default function MapContext({ children }) {
	const [ activeFilter, setActiveFilter ] = useState('all');
	const [ tourLocation, setTourLocation ] = useState(null);
	const [ currentPosition, setCurrentPosition ] = useState([]);
	const [ travelTime, setTravelTime ] = useState(null);
	const [ radius, setRadius ] = useState(0);
	const [ eventLocation, setEventLocation ] = useState(null);

	const [ showModal, setShowModal ] = useState(false);
	const [ selectedTour, setSelectedTour ] = useState([]);

	useEffect(
		() => {
			const userPosition = JSON.parse(localStorage.getItem('position'));
			const userRadius = JSON.parse(localStorage.getItem('radius'));

			if (userPosition || userRadius) {
				setCurrentPosition([ userPosition.lat, userPosition.lng ]);
				setRadius(userRadius);
			}
		},
		[ setCurrentPosition, setRadius ]
	);

	return (
		<context.Provider
			value={{
				activeFilter,
				setActiveFilter,
				tourLocation,
				setTourLocation,
				currentPosition,
				setCurrentPosition,
				radius,
				setRadius,
				travelTime,
				setTravelTime,
				eventLocation,
				setEventLocation,
				selectedTour,
				setSelectedTour,
				showModal,
				setShowModal
			}}
		>
			{children}
		</context.Provider>
	);
}

export function useMapContext() {
	const data = useContext(context);
	if (!data) throw new Error("You can't use context here");
	return data;
}
