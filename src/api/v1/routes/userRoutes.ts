import express, { Router } from "express";
import { getUserDetails } from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import * as userControllers from "../controllers/userController";

const router: Router = express.Router();

router.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"]}),
    getUserDetails
);

router.get(
    "/",
    userControllers.getAllUsers
);

router.get(
    "/myprofile",
    userControllers.getUserById
);

router.post(
    "/",
    userControllers.createUser
);

router.put(
    "/:id",
    userControllers.updateUser
);

router.delete(
    "/:id",
    userControllers.deleteUser
);

export default router;
