import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	total: [],
	selected: null
};
const initialState1 = {
	// total: [
	// 	["Introduction", "What is COVID-19?", "Understanding the COVID-19 vaccine", "How effective is the COVID-19 vaccine?", "Safety and side effects of the COVID-19 vaccine", "Why getting vaccinated is important in reducing COVID-19 deaths", "Conclusion"],
	// 	["Introduction", "What is COVID-19 and why is it dangerous?", "The importance of vaccinations", "How does the COVID-19 vaccine work?", "Safety and efficacy of the COVID-19 vaccine", "Addressing common myths and concerns about the vaccine", "Conclusion"],
	// 	["Introduction", "What is COVID-19?", "Understanding the COVID-19 vaccine", "How does the COVID-19 vaccine work?", "Benefits of getting vaccinated against COVID-19", "Addressing common concerns about the COVID-19 vaccine", "Conclusion"],
	// 	["Introduction", "The importance of the COVID-19 vaccine", "How does the COVID-19 vaccine work?", "Safety and efficacy of the COVID-19 vaccine", "Addressing concerns and misconceptions about the COVID-19 vaccine", "Conclusion: The role of vaccination in reducing COVID-19 deaths"],
	// ],
	// selected: ["Introduction", "What is COVID-19?", "Understanding the COVID-19 vaccine", "How does the COVID-19 vaccine work?", "Benefits of getting vaccinated against COVID-19", "Addressing common concerns about the COVID-19 vaccine", "Conclusion"]
	total: [
		["What is COVID-19?", "Understanding the COVID-19 vaccine", "How effective is the COVID-19 vaccine?", "Safety and side effects of the COVID-19 vaccine", "Why getting vaccinated is important in reducing COVID-19 deaths"],
		["What is COVID-19 and why is it dangerous?", "The importance of vaccinations", "How does the COVID-19 vaccine work?", "Safety and efficacy of the COVID-19 vaccine", "Addressing common myths and concerns about the vaccine"],
		["What is COVID-19?", "Understanding the COVID-19 vaccine", "How does the COVID-19 vaccine work?", "Benefits of getting vaccinated against COVID-19", "Addressing common concerns about the COVID-19 vaccine"],
		["The importance of the COVID-19 vaccine", "How does the COVID-19 vaccine work?", "Safety and efficacy of the COVID-19 vaccine", "Addressing concerns and misconceptions about the COVID-19 vaccine"],
	],
	selected: ["What is COVID-19?", "Understanding the COVID-19 vaccine", "How does the COVID-19 vaccine work?", "Benefits of getting vaccinated against COVID-19", "Addressing common concerns about the COVID-19 vaccine"]
};

export const outlineSlice = createSlice({
	name: 'outline',
	initialState: initialState1,
	reducers: {
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
			state.selected = null;
		},
		reset: (state) => state = initialState
	},
});

export const { setTotal, resetTotal, setSelected, resetSelected, reset } = outlineSlice.actions;

export default outlineSlice.reducer;
