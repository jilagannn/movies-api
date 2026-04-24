import { Request, Response } from "express";
import isAuthorized from "../../src/api/v1/middleware/authorize";
import { AuthorizationError } from "../../src/api/v1/errors/errors";
import { MiddlewareFunction } from "../../src/api/v1/types/expressTypes";

describe("isAuthorized middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            params: {},
        };
        mockResponse = {
            locals: {},
        };
        nextFunction = jest.fn();
    });

    it("should call next() when user has required role", () => {
        // Arrange
        mockResponse.locals = {
            uid: "admin123",
            role: "admin",
        };

        const middleware: MiddlewareFunction = isAuthorized({ hasRole: ["admin", "critic"] });

        // Act
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        // Called without error
        expect(nextFunction).toHaveBeenCalledWith();
    });

    it("should pass AuthorizationError to next() when user has insufficient role", () => {
        // Arrange
        mockResponse.locals = {
            uid: "officer123",
            role: "officer",
        };

        const middleware: MiddlewareFunction = isAuthorized({ hasRole: ["admin"] });

        // Act
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthorizationError)
        );
        const error: AuthorizationError = nextFunction.mock.calls[0][0];
        expect(error.message).toBe("Forbidden: Insufficient role");
        expect(error.code).toBe("INSUFFICIENT_ROLE");
        expect(error.statusCode).toBe(403);
    });

    it("should call next() when same user and allowSameUser is true", () => {
        // Arrange
        mockRequest.params = { id: "officer123" };
        // User doesn't have admin role
        mockResponse.locals = {
            uid: "officer123",
            role: "officer",
        };

        const middleware: MiddlewareFunction = isAuthorized({
            hasRole: ["admin"],
            allowSameUser: true,
        });

        // Act
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        // Should succeed due to allowSameUser
        expect(nextFunction).toHaveBeenCalledWith();
    });

    it("should pass AuthorizationError to next() when role is missing", () => {
        // Arrange
        mockResponse.locals = {
            uid: "officer123",
            // No role property
        };

        const middleware: MiddlewareFunction = isAuthorized({ hasRole: ["admin"] });

        // Act
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthorizationError)
        );
        const error: AuthorizationError = nextFunction.mock.calls[0][0];
        expect(error.message).toBe("Forbidden: No role found");
        expect(error.code).toBe("ROLE_NOT_FOUND");
    });

    it("should not allow same user when allowSameUser is false", () => {
        // Arrange
        mockRequest.params = { id: "officer123" };
        mockResponse.locals = {
            uid: "officer123",
            role: "officer",
        };

        // Explicitly disabled
        const middleware: MiddlewareFunction = isAuthorized({
            hasRole: ["admin"],
            allowSameUser: false,
        });

        // Act
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthorizationError)
        );
    });
});
