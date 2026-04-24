import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse } from "../models/responseModel";

const SIGN_IN_URL: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

// Source - https://stackoverflow.com/a/33643701
// Posted by basarat, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-10, License - CC BY-SA 4.0

const API_KEY: string | undefined = process.env.FIREBASE_WEB_API_KEY


export const login = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        // sending a request with fetch (similar to how we do it on bruno)
        const response: globalThis.Response = await fetch(
            `${SIGN_IN_URL}${API_KEY}`, 
            {
                method: "POST",
                body: JSON.stringify({
                    email: email, 
                    password: password, 
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json(
                errorResponse("Sign in failed", "INCORRECT_CREDENTIALS")
            );
        };

        const data: {
            idToken: string,
            email: string,
            localId: string,
            expiresIn: string,
            refreshToken: string
        } = await response.json();
        const { idToken, localId, expiresIn, refreshToken } = data;

        const userData: {
            idToken: string,
            email: string,
            localId: string,
            expiresIn: string,
            refreshToken: string
        } = {
            idToken: idToken,
            email: email,
            localId: localId,
            expiresIn: expiresIn,
            refreshToken: refreshToken
        };
        res.status(HTTP_STATUS.OK).json(
            userData
        );
    } catch (error) {
        next(error);
    };
};
