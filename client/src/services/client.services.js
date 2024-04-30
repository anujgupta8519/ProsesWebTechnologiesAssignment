import axios from "axios";

const ClientLoginService = (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        axios
            .post("/api/client/login", data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}



const addCustomer = (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        axios
            .post("/api/client/customer", data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
const updateCustomer = (data) => {

    return new Promise((resolve, reject) => {
        axios
            .put("/api/client/customer", data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

const deleteCustomer =  (data) => {

    return new Promise((resolve, reject) => {
        console.log(data)
        axios
            .delete(`/api/client/customer/${data}`, )
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

const getAllCustomers = () => {
    return new Promise((resolve, reject) => {   
        axios
            .get("/api/client/customers")
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}


export { ClientLoginService, addCustomer, updateCustomer, deleteCustomer, getAllCustomers }