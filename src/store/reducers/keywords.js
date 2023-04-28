import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	fraseCluster: [],
	total: [],
	selected: []
};
const initialState1 = {
	fraseCluster: [],
	total: ['covid-19 status', 'covid-19 vaccine', 'covid-19 deaths', 'covid-19 test'],
	selected: ['covid-19 vaccine', 'covid-19 deaths',]
};

export const keywordSlice = createSlice({
	name: 'keyword',
	initialState: initialState1,
	reducers: {
		setFraseCluster: (state, action) => {
			state.fraseCluster = action.payload;
		},
		setTotal: (state, action) => {
			state.total = action.payload;
		},
		resetTotal: (state) => {
			state.total = [];
		},
		setSelected: (state, action) => {
			state.selected = action.payload;
		},
		resetSelected: (state) => {
			state.selected = [];
		},
		reset: (state) => state = initialState
	},
});

export const { setFraseCluster, setTotal, resetTotal, setSelected, resetSelected, reset } = keywordSlice.actions;

export default keywordSlice.reducer;
