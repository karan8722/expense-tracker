
const API = "/api";

// Get data from backend
export async function getData(url) {

    const response = await fetch(API + url);

    if (!response.ok) {
        throw new Error("Unable to get data");
    }

    return response.json();
}

// Send data to backend
export async function sendData(url, method, data) {

    const response = await fetch(API + url, {

        method: method,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}
