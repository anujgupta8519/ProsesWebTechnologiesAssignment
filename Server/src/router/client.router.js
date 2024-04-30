import { Router } from "express";
import { addCustomer, deleteCustomer, getAllCustomer, login, updateCustomer } from "../controller/client.controllerr.js";
import { auth } from "../middlewares/isUser.js";

const router = Router();

router.route('/login').post(login);
router.route('/customer').post(auth, addCustomer).put(auth, updateCustomer)
router.route('/customer/:id').delete(auth, deleteCustomer)
router.route('/customers').get(auth, getAllCustomer);

export  default router