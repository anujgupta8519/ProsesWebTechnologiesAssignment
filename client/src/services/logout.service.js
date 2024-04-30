import axios from "axios";

const logout = () => {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/logout")
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export {logout}