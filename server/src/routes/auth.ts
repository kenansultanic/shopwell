import { Router } from "express";
import { googleLogin, login, newAccesToken, register, restartPassword, sendCode } from "../controllers/auth";
import { findUserByEmail } from "../middleware/auth";

const router = Router();

router.post('/login', login);

router.post('/google-login', googleLogin);

router.post('/register', register);

router.get('/check-email', findUserByEmail, sendCode);

router.patch('/restart-password', restartPassword);

router.post('/new-access-token', newAccesToken);

export default router;