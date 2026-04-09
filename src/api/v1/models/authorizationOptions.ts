export interface AuthorizationOptions {
    hasRole: Array<"admin" | "critic" | "viewers">;
    allowSameUser?: boolean;
};
