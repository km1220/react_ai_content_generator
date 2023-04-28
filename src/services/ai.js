import _ from 'lodash';
import axios from 'axios';

// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';


export const _frase_cluster = async (userInputText) => {
	if (!userInputText) return false;

	const reqData = JSON.stringify({
		"query": userInputText,
		"lang": "en",
		"country": "us",
		"count": 20,
		"include_full_text": false,
		// "user_url": "https://www.theatlantic.com/technology/archive/2022/06/google-engineer-sentient-ai-chatbot/661273/"
	});
	const config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: '/api/frase/' + 'v1/process_serp',
		headers: {
			'token': import.meta.env.VITE_FRASE_API_KEY,
			'Content-Type': 'application/json'
		},
		data: reqData
	};
	const res = await axios.request(config);
	const resData = res.data;
	if (!resData || !resData['cluster_info'])
		return false;


	const result = resData.cluster_info.map(each => ({ label: each.label, keywords: each.cluster_entities.map(e => e.entity) }));

	return result;
}
export const _ai_generate = (promptText, params = {}) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!import.meta.env.VITE_OPENAI_API_KEY)
				return resolve(false);
			if (!promptText && !params.messages.length)
				return resolve(false);


			const res = await axios.post('/api/openai/' + 'v1/chat/completions',
				JSON.stringify({
					model: "gpt-3.5-turbo",
					// model: "gpt-4",
					messages: [
						{
							role: "system",
							content: "You are a content generator for a website blogs.\nYou respond as an expert, but in a casual way."
						},
						{
							role: "user",
							content: `${promptText}`
						}
					],
					temperature: 0.7,
					max_tokens: 2000,
					top_p: 1.0,
					frequency_penalty: 0.5,
					presence_penalty: 0.5,
					n: 1,
					// stop: ["\n\n"],
					...params
				}),
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
					}
				}
			);

			const resultContents = res.data.choices
				.filter(each => each.finish_reason === "stop")
				.map(each => each.message.content);

			console.log(res.data, resultContents);

			if (!resultContents || !resultContents.length)
				return resolve(false);

			resolve(resultContents);
		} catch (error) {
			reject(error);
		}
	});
}