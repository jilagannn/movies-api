import { Request, Response, NextFunction } from "express";
import { auth } from "../../../../config/firebaseConfig";
import { UserRecord } from "firebase-admin/auth";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

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