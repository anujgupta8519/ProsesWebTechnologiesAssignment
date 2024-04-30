import {Router} from 'express';
import { addClient, adminLogin, deleteClient, getAllCleints, updateClient } from '../controller/admin.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = Router();

router.route('/login').post(adminLogin);
router.route('/client').post(isAdmin,addClient).put(isAdmin,updateClient)
router.route('/client/:id').delete(isAdmin,deleteClient)
router.route('/clients').get(getAllCleints);

export default router