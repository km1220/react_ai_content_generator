import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	description: ''
};
const initialState1 = {
	description: 'covid-19'
};

export const userInputSlice = createSlice({
	name: 'user_inputs',
	initialState: initialState1,
	reducers: {
		setDescription: (state, action) => {
			state.description = action.payload;
		},
		resetDescription: (state) => {
			state.description = [];
		},
		reset: (state) => state = initialState
	},
});

export const { setDescription, resetDescription, reset } = userInputSlice.actions;

export default userInputSlice.reducer;
