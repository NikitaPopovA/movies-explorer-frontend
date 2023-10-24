import checkResponse from "./utils";

export const BASE_URL = `localhost:3000`;

export function getCards() {
    return fetch(BASE_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => checkResponse(res));
}
