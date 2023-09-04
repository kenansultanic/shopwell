import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { changePassword, updateUserInfo, getRestrictions, updateUsersRestrictions, suggestNewRestriction, allowExtraEmails } from "../controllers/user";

const router = Router();

router.patch('/change-password', verifyToken, changePassword);

router.patch('/info/:id', verifyToken, updateUserInfo);

router.patch('/allow-extra-emails', allowExtraEmails);

router.patch('/update-restriction-:key', verifyToken, updateUsersRestrictions);

router.get('/get-restrictions', verifyToken, getRestrictions);

router.post('/suggest-new-restriction', suggestNewRestriction);

export default router;