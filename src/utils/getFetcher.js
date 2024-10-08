import axios from 'axios';

export const defaultGetFetcher = (url) =>
    axios
        .get(url)
        .then((res) => {
            console.log('res:', res);
            return res.data;
        })
        .catch((error) => {
            throw error;
        });
