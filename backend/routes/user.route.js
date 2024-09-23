import express from 'express'
import { login, logout, register, updateProfile } from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import multer from 'multer';
import { storage } from '../utils/Cloudniary.js';

const upload = multer({ storage });

const router = express.Router()

router.route("/register").post(upload.single('profilePhoto'), register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/updateProfile").post(isAuthenticated, upload.single('resume'), updateProfile);

export default router