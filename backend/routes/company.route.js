import express from 'express'

import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
import multer from 'multer';
import { storage } from '../utils/Cloudniary.js';
const upload = multer({ storage });
const router = express.Router()

router.route("/register").post(isAuthenticated, registerCompany);

router.route("/get").get(isAuthenticated, getCompany);

router.route("/get/:id").get(isAuthenticated, getCompanyById);

router.route("/update/:id").post(isAuthenticated, upload.single('logo'), updateCompany);

export default router