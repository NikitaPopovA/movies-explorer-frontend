const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ой...: ${res.status}`);
};

export default checkResponse;
