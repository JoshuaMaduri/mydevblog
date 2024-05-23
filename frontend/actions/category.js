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


export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
}

export const singleCategory = (slug) => {
    return fetch(`${API}/category/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
            return response.json();
    }).catch(err => console.log(err))
}


export const removeCategory = (slug, token) => {

    return fetch(`${API}/category/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}