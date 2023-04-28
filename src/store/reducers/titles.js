import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	total: [],
	selected: null
};
const initialState1 = {
	total: [
		'Covid-19 Vaccine: What You Need to Know and How it Can Help Us Move Forward',
		'Everything You Need to Know About the COVID-19 Vaccine: A Comprehensive Guide',
		'Get the Facts: All You Need to Know About the COVID-19 Vaccine'
	],
	selected: 'Get the Facts: All You Need to Know About the COVID-19 Vaccine'
};

export const titleSlice = createSlice({
	name: 'title',
	initialState: initialState1,
	reducers: {
		setTotal: (state, action) => {
			console.log(action, '1231231231231231312323132')
			state.total = action.payload;
		},
		resetTotal: (state) => {
			state.total = [];
		},
		setSelected: (state, action) => {
			state.selected = action.payload;
		},
		resetSelected: (state) => {
			state.selected = null;
		},
		reset: (state) => state = initialState
	},
});

export const { setTotal, resetTotal, setSelected, resetSelected, reset } = titleSlice.actions;

export default titleSlice.reducer;
