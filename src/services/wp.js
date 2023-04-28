import axios from 'axios';

export const createNewPost = (postData) => {
    const username = import.meta.env.VITE_WP_USERNAME;
    const password = import.meta.env.VITE_WP_PASSWORD;
    const url = import.meta.env.VITE_WP_SITE_URL + '/wp-json/wp/v2/posts';
    const auth = { username, password };
    const data = {
        title: postData.title,
        content: postData.content,
        status: postData.status // publish, draft, etc.
        // Add any other fields you want to include in the post object
    };
    return axios.post(url, data, { auth });
};