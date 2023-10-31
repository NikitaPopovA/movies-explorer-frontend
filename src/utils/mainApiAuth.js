class MainApiAuth {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _checkResponse = (res) =>
        res.ok ? res.json() : Promise.reject(`Ой...: ${res.status}`);

    async _request(url, options) {
        const res = await fetch(url, options);
        return this._checkResponse(res);
    }

    checkToken = (token) =>
        this._request(`${this.baseUrl}/users/me`, {
            headers: { ...this.headers, Authorization: `Bearer ${token}` },
        });

    signup = ({ name, email, password }) =>
        this._request(`${this.baseUrl}/signup`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ name, email, password }),
        });

    signin = ({ email, password }) =>
        this._request(`${this.baseUrl}/signin`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ email, password }),
        });
}

export const apiAuth = new MainApiAuth({
    baseUrl: "https://api.popov.nomoredomainsrocks.ru",
    headers: {
        "Content-Type": "application/json",
    },
});
