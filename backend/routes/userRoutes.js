import express from "express";
import {
	login,
	logout,
	signup,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,getAllUsers,deleteUser
} from "../controllers/userController.js";
import { verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/check-auth", verifyToken, checkAuth);
router.get('/allUsers',getAllUsers),
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.delete("/deleteUser",deleteUser);
// router.post('/profile', upload.single('profileImage'), updateProfile); // 'profileImage' is the form field name

export default router;


