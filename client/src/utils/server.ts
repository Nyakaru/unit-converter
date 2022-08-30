import axios from 'axios';

const baseUrl = ' http://localhost:5000/';

export const getData = async (url: string) => {
    const requestUrl = baseUrl + url;
    const response = await axios.get(requestUrl);
    const { data } = response;
    return data;
  };