import axios from "axios";


const adminLogin = (data) => {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/admin/login", data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

const addClient = (data)=>{

    return new Promise((resolve, reject) => {
        axios
            .post("/api/admin/client", data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}


const updateClient = (data) => {
    console.log(data);

    return new Promise((resolve, reject) => {
        axios
            .put("/api/admin/client", data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

const deleteClient =  (data) => {

    console.log(data);
    return new Promise((resolve, reject) => {
        axios
            .delete(`/api/admin/client/${data}`,)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
const getAllClients = () => {
    return new Promise((resolve, reject) => {
        axios
            .get("/api/admin/clients")
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export {adminLogin, addClient, updateClient, deleteClient, getAllClients}