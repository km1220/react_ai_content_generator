import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	total: [],
	selected: null
};
const initialState1 = {
	total: [
		`The COVID-19 pandemic has affected millions of people globally, leading to many deaths and widespread disruptions. While several measures have been put in place to control the spread of the virus, such as social distancing and wearing masks, the development of a vaccine has been a critical breakthrough in the fight against COVID-19. In this article, we will provide you with all the information you need to know about the COVID-19 vaccine. We will explore how it works, its safety and effectiveness, and why it is crucial in reducing COVID-19 deaths worldwide. We will also address some common questions and concerns about the vaccine and highlight its importance in ending this global crisis.`,
		`The COVID-19 pandemic has affected millions of people worldwide, resulting in numerous deaths and a significant impact on the global economy. While social distancing measures have helped slow the spread of the virus, the development of a COVID-19 vaccine offers hope for a return to normalcy. However, there is much debate and misinformation surrounding the vaccine's safety and effectiveness. In this article, we aim to provide you with all the facts you need to know about the COVID-19 vaccine. We will examine how it works, its safety and efficacy, and what to expect when getting vaccinated. We will also address common concerns and questions surrounding the vaccine, helping you make an informed decision about protecting yourself and your loved ones from COVID-19-related deaths.`,
		`The COVID-19 pandemic has affected the world in unprecedented ways, with millions of people losing their lives and many more suffering from its effects. Fortunately, the development of a COVID-19 vaccine offers hope in the fight against this deadly virus. However, misinformation and confusion surrounding the vaccine have led to hesitancy and skepticism among some individuals. In this article, we will provide all the facts you need to know about the COVID-19 vaccine, including how it works, its safety and efficacy, and why it is crucial in reducing COVID-19 deaths. We will also address common questions and concerns about the vaccine to help you make an informed decision about protecting yourself and your loved ones.`,
		`The COVID-19 pandemic has had a profound impact on the world, with over 200 million confirmed cases and millions of deaths. The development of vaccines has been crucial in the fight against this virus, offering hope in these uncertain times. However, there is still much confusion and misinformation surrounding the COVID-19 vaccine. In this article, we will provide you with all the facts you need to know about the vaccine - from its effectiveness to any potential side effects. We'll also explore why getting vaccinated is essential for reducing the spread of COVID-19 and ultimately saving lives. So let's dive into everything you need to know about the COVID-19 vaccine.`,
		`Over the past year, the world has been grappling with a pandemic that has caused widespread illness and loss of life. As we continue to navigate through this challenging time, one potential solution on the horizon is the COVID-19 vaccine. With vaccines being distributed around the globe, there are many questions and concerns about their safety and efficacy. In this article, we will provide you with all the information you need to know about the COVID-19 vaccine, including how it works, who is eligible for it, and what you can expect after getting vaccinated. We will also address some common myths surrounding the vaccine and discuss why getting vaccinated is crucial in reducing COVID-19 deaths.`,
	],
	selected: `The COVID-19 pandemic has affected millions of people worldwide, resulting in numerous deaths and a significant impact on the global economy. While social distancing measures have helped slow the spread of the virus, the development of a COVID-19 vaccine offers hope for a return to normalcy. However, there is much debate and misinformation surrounding the vaccine's safety and effectiveness. In this article, we aim to provide you with all the facts you need to know about the COVID-19 vaccine. We will examine how it works, its safety and efficacy, and what to expect when getting vaccinated. We will also address common concerns and questions surrounding the vaccine, helping you make an informed decision about protecting yourself and your loved ones from COVID-19-related deaths.`,
};

export const articleIntroSlice = createSlice({
	name: 'article_intros',
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

export const { setTotal, resetTotal, setSelected, resetSelected, reset } = articleIntroSlice.actions;

export default articleIntroSlice.reducer;
