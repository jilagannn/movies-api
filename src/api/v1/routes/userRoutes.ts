import express, { Router } from "express";
import { getUserDetails } from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import * as userControllers from "../controllers/userController";

const router: Router = express.Router();

router.get(
    "/myprofile",
    authenticate,
    userControllers.getUserById
);

router.get(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin"]}),
    userControllers.getAllUsers
);

router.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"]}),
    getUserDetails
);

router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin"]}),
    userControllers.createUser
);

router.put(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"]}),
    userControllers.updateUser
);

router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"]}),
    userControllers.deleteUser
);

export default router;
