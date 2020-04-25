const api = 'http://localhost:3002/api/react/';

export const ApiService = {
    get(endpoint){
        return fetch(`${api}${endpoint}`)
        .then(response => response.json());
    }
}