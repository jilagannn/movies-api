import { Request, Response, NextFunction } from "express";
import { auth } from "../../../../config/firebaseConfig";
import { UserRecord } from "firebase-admin/auth";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { User } from "../models/userModel";
import * as userServices from "../services/userService";

export const getUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id } = req.params;

    try {
        const user: UserRecord = await auth.getUser(id as string);
        res.status(HTTP_STATUS.OK).json(
            successResponse(user)
        );
    } catch (error) {
        next(error);
    };
};

export const getAllUsers = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const users: User[] = await userServices.getAllUsers();
        const count: number = users.length;
        res.status(HTTP_STATUS.OK).json(
            successResponse(users, "Users retrieved successfully", count)
        );
    } catch (error) {
        next(error);
    };
};

export const getUserById = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const uid = res.locals.uid
        const userData: User = await userServices.getUserById(uid);
        res.status(HTTP_STATUS.OK).json(
            successResponse(userData, "User retrieved successfully")
        );
    } catch (error) {
        next(error);
    };
};

export const createUser = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, uid } = req.body;
        const userId = (uid as string)
        const userData: {
            name: string
        } = { name };

        const newUser: User = await userServices.createUser(userData, userId);
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newUser, "User created successfully")
        );
    } catch (error) {
        next(error);
    };
};

export const updateUser = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = res.locals.uid;
        const userId: string = (id as string);
        const { name } = req.body;
        const updatedUserData: Partial<Pick<User, "name" >> ={ name };

        const updatedUser: User = await userServices.updateUser(userId, updatedUserData);
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedUser, "User updated successfully")
        );
    } catch (error) {
        next(error);
    };
};

export const deleteUser = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = res.locals.uid;
        const userId: string = (id as string);
        
        await userServices.deleteUser(userId);
        res.status(HTTP_STATUS.NO_CONTENT).json({
            message: "User deleted successfully"
        })
    } catch (error) {
        next(error);
    };
};
