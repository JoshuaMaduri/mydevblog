import fetch from 'isomorphic-fetch'
import {API} from '../config'


export const create = (category, token) => {

    return fetch(`${API}/category`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        , body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

