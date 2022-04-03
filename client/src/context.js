import * as React from 'react';
import data from './Assets/Products.json';

const FilterContext = React.createContext(data);

function filterReducer(state, { type, payload }) {
	const copyState = data;
	state = copyState;
	switch (type) {
		case 'filterOffer': {
			const response =
				payload !== 'Show all'
					? state.filter((d) => d.is_offer.toString() === payload)
					: state;

			return response;
		}
		default:
			return data;
	}
}

function FilterProvider({ children }) {
	const [state, dispatch] = React.useReducer(filterReducer, data);
	const value = { state, dispatch };
	return (
		<FilterContext.Provider value={value}>
			{children}
		</FilterContext.Provider>
	);
}

function useFilter() {
	const context = React.useContext(FilterContext);
	if (context === undefined) {
		throw new Error('useCount must be used within a CountProvider');
	}
	return context;
}

export { filterReducer, FilterProvider };
