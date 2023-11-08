import { API_URL } from './constants/system'

class MainApi {
    constructor(options) {
        this._url = options.url;
    }

    _checkResponse = (res) => { 
        const errObj = {
            status: res.status,
            statusText: res.statusText
        }
        return res.ok ? res.json() : Promise.reject(errObj);  
    }

    _fetch(path, method, data) {
        const body =
            (method === "PATCH" || method === "POST") && data
                ? JSON.stringify(data)
                : data;

        return fetch(`${this._url}${path}`, {
            method,
            headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            body,
        }).then(this._checkResponse);
    }

    getUserInfo = () => this._fetch("/users/me", "GET");

    setUserInfo = (data) => this._fetch("/users/me", "PATCH", data);

    addNewCard = (data) => this._fetch("/movies", "POST", data);

    getInitialCards = () => this._fetch("/movies", "GET");

    deleteCard = (id) => this._fetch(`/movies/${id}`, "DELETE");
}

export const api = new MainApi({
    url: `${API_URL}`,
});
