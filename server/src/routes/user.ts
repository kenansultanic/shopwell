import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { changePassword, updateUserInfo, updateUsersRestrictions } from "../controllers/user";

const router = Router();

router.patch('/change-password', verifyToken, changePassword);

router.patch('/user-info/:id', verifyToken, updateUserInfo);

router.patch('/update-:key', verifyToken, updateUsersRestrictions);

//router.get('/get-restrictions/', verifyToken, getRestrictions);

export default router;