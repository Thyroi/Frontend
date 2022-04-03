import * as React from 'react';
import data from './Assets/Products.json';

const FilterContext = React.createContext(data);

function filterReducer(state, { type, payload }) {
	const copyState = data;
	state = copyState;
	switch (type) {
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

export { filterReducer, FilterProvider };
