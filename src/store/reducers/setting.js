import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
};

export const settingSlice = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		startLoading: (state) => {
			state.loading = true;
		},
		endLoading: (state) => {
			state.loading = false;
		}
	},
});

export const { startLoading, endLoading } = settingSlice.actions;

export default settingSlice.reducer;
