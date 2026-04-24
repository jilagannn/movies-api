import { User } from "../models/userModel";
import { QuerySnapshot, DocumentSnapshot, DocumentData } from "firebase-admin/firestore";
import * as firestoreRepo from "../repositories/firestoreRepository";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { AppError } from "../errors/errors";

const COLLECTION = "users";

export const getAllUsers = async(): Promise<User[]> => {
    try {
        const snapshot: QuerySnapshot = await firestoreRepo.getDocuments(COLLECTION);
        const users: User[] = snapshot.docs.map(doc => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data
            } as User;
        });
        return users;
    } catch (error) {
        throw error;
    };
};

export const getUserById = async(
    movieId: string
): Promise<User> => {
    try {
        const snapshot: DocumentSnapshot | null = await firestoreRepo.getDocumentById(COLLECTION, movieId);
        if (!snapshot) {
            throw new AppError("User does not exist", "USER_NOT_FOUND", HTTP_STATUS.NOT_FOUND);
        };

        const userData: DocumentData | undefined = snapshot.data();
        const user: User = {
            id: snapshot.id,
            ...userData
        } as User;

        return structuredClone(user);
    } catch (error) {
        throw error;
    };
};

export const createUser = async(userData: {
    name: string
    },
    uid: string
): Promise<User> => {
    try {
        const newUserData: {
            name: string,
            role: string,
            registeredAt: string
        } = {
            ...userData,
            role: "viewer",
            registeredAt: new Date().toISOString()
        };

        const id: string = await firestoreRepo.createDocument<User>(COLLECTION, newUserData, uid);
        return { id, ...newUserData } as User;
    } catch (error) {
        throw error;
    };
};

export const updateUser = async(
    userId: string,
    userData: Partial<Pick<User, "name" >>
): Promise<User> => {
    try {
        const user: User = await getUserById(userId);

        if (!user) {
            throw new AppError("User does not exist", "USER_NOT_FOUND", HTTP_STATUS.NOT_FOUND);
        };
        let updatedUser: User;

        if (userData) {
            updatedUser = {
                ...user,
                ...userData
            };

        } else {
            updatedUser = {
                ...user
            };
        };

        await firestoreRepo.updateDocument<User>(COLLECTION, userId, updatedUser);

        return structuredClone(updatedUser);
    } catch (error) {
        throw error;
    };
};

export const deleteUser = async(
    userId: string
): Promise<void> => {
    const user: User = await getUserById(userId);

    if (!user) {
        throw new AppError("User does not exist", "USER_NOT_FOUND", HTTP_STATUS.NOT_FOUND);
    };

    await firestoreRepo.deleteDocument(COLLECTION, userId);
};
