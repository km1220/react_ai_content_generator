import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	total: [],
	selected: null
};
const initialState1 = {
	total: [
		`1111`,
		`22222`,
		`3333`,
		`444444444`,
		`5555555`,
	],
	selected: `5555555`
};

export const articleConclusionSlice = createSlice({
	name: 'article_conclusions',
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

export const { setTotal, resetTotal, setSelected, resetSelected, reset } = articleConclusionSlice.actions;

export default articleConclusionSlice.reducer;
