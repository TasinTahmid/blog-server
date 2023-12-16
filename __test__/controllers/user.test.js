const userService = require("../../services/user.service");
const controller = require("../../controllers/user.controller");
const formatData = require("../../utils/formatData");

jest.mock("../../utils/formatData");

describe("Testing userControllers.", () => {
    describe("1. register method.", () => {
        it("Test-case 1: Should create a user with status code 201", async () => {
            // Arrange
            const req = {
                body: {
                    username: "mock-username",
                    email: "mock-email",
                    password: "mock-password",
                },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                cookie: jest.fn().mockReturnValue("mock-token"),
            };

            const next = jest.fn();

            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
            };
            const mockCreatedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const token = "mock-token";
            const mockResponse = {
                newUser: mockUser,
                token,
            };

            jest.spyOn(userService, "register").mockResolvedValue(mockResponse);
            formatData.mockReturnValue(mockResponse);

            // Act
            await controller.register(req, res, next);

            // Assert
            expect(userService.register).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(mockResponse);
            expect(next).not.toHaveBeenCalled();
        });

        it("Test-case 2: Should throw Internal server error with status code 500", async () => {
            const req = {
                body: {
                    username: "mock-username",
                    email: "mock-email",
                    password: "mock-password",
                },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                cookie: jest.fn().mockReturnValue("mock-token"),
            };

            const next = jest.fn();

            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
            };
            const mockCreatedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const token = "mock-token";
            const mockResponse = {
                newUser: mockUser,
                token,
            };
            const mockError = new Error("Internal server error.");

            jest.spyOn(userService, "register").mockRejectedValue(mockError);
            formatData.mockReturnValue(mockResponse);

            // Act
            await controller.register(req, res, next);

            // Assert
            expect(userService.register).toHaveBeenCalledWith(req.body);
            expect(res.status).not.toHaveBeenCalledWith(201);
            expect(res.send).not.toHaveBeenCalledWith(mockResponse);
            expect(next).toHaveBeenCalledWith(mockError);
        });
    });

    describe("2. login method.", () => {
        it("Test-case 1: Should create a user with status code 201", async () => {
            // Arrange
            const req = {
                body: {
                    email: "mock-email",
                    password: "mock-password",
                },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                cookie: jest.fn().mockReturnValue("mock-token"),
            };

            const next = jest.fn();

            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
            };
            const token = "mock-token";
            const unformattedResponse = {
                sequelizeUser: mockUser,
                token,
            };
            const formattedResponse = {
                user: mockUser,
                token,
            };

            jest.spyOn(userService, "login").mockResolvedValue(unformattedResponse);
            formatData.mockReturnValue(formattedResponse);

            // Act
            await controller.login(req, res, next);

            // Assert
            expect(userService.login).toHaveBeenCalledWith("mock-email", "mock-password");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(formattedResponse);
            expect(next).not.toHaveBeenCalled();
        });

        it("Test-case 2: Should throw Internal server error with status code 500", async () => {
            // Arrange
            const req = {
                body: {
                    email: "mock-email",
                    password: "mock-password",
                },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                cookie: jest.fn().mockReturnValue("mock-token"),
            };

            const next = jest.fn();

            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
            };
            const token = "mock-token";
            const unformattedResponse = {
                sequelizeUser: mockUser,
                token,
            };
            const formattedResponse = {
                user: mockUser,
                token,
            };
            const mockError = new Error("Internal server error.");

            jest.spyOn(userService, "login").mockRejectedValue(mockError);
            formatData.mockReturnValue(formattedResponse);

            // Act
            await controller.login(req, res, next);

            // Assert
            expect(userService.login).toHaveBeenCalledWith("mock-email", "mock-password");
            expect(res.status).not.toHaveBeenCalledWith(200);
            expect(res.send).not.toHaveBeenCalledWith(formattedResponse);
            expect(next).toHaveBeenCalledWith(mockError);
        });
    });

    describe("3. updateUserById method.", () => {
        it("Test-case 1: Should update a user by id.", async () => {
            const req = {
                params: { id: "mock-id" },
                body: {
                    oldPassword: "mock-password",
                    newPassword: "mock-password",
                },
                loggedInUserId: "mock-id",
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                cookie: jest.fn().mockReturnValue("mock-token"),
            };

            const next = jest.fn();

            const mockUpdatedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };

            jest.spyOn(userService, "updateUserById").mockResolvedValue(mockUpdatedUser);
            formatData.mockReturnValue(mockUpdatedUser);

            // Act
            await controller.updateUserById(req, res, next);

            // Assert
            expect(userService.updateUserById).toHaveBeenCalledWith(
                "mock-id",
                "mock-id",
                "mock-password",
                "mock-password"
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockUpdatedUser);
            expect(next).not.toHaveBeenCalled();
        });

        it("Test-case 2: Should throw Internal server error with status code 500", async () => {
            const req = {
                params: { id: "mock-id" },
                body: {
                    oldPassword: "mock-password",
                    newPassword: "mock-password",
                },
                loggedInUserId: "mock-id",
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                cookie: jest.fn().mockReturnValue("mock-token"),
            };

            const next = jest.fn();

            const mockUpdatedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockError = new Error("Internal server error.");

            jest.spyOn(userService, "updateUserById").mockRejectedValue(mockError);

            // Act
            await controller.updateUserById(req, res, next);

            // Assert
            expect(userService.updateUserById).toHaveBeenCalledWith(
                "mock-id",
                "mock-id",
                "mock-password",
                "mock-password"
            );
            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(mockError);
        });
    });

    describe("4. deleteUserById method.", () => {
        it("Test-case 1: Should delete a user by id from database.", async () => {
            const req = {
                params: { id: "mock-id" },
                loggedInUserId: "mock-id",
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                cookie: jest.fn().mockReturnValue("mock-token"),
            };

            const next = jest.fn();

            const mockDeletedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };

            jest.spyOn(userService, "deleteUserById").mockResolvedValue(mockDeletedUser);
            formatData.mockReturnValue(mockDeletedUser);

            // Act
            await controller.deleteUserById(req, res, next);

            // Assert
            expect(userService.deleteUserById).toHaveBeenCalledWith("mock-id", "mock-id");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockDeletedUser);
            expect(next).not.toHaveBeenCalled();
        });

        it("Test-case 2: Should throw Internal server error with status code 500", async () => {
            const req = {
                params: { id: "mock-id" },
                loggedInUserId: "mock-id",
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                cookie: jest.fn().mockReturnValue("mock-token"),
            };

            const next = jest.fn();

            const mockDeletedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockError = new Error("Internal server error.");

            jest.spyOn(userService, "deleteUserById").mockRejectedValue(mockError);

            // Act
            await controller.deleteUserById(req, res, next);

            // Assert
            expect(userService.deleteUserById).toHaveBeenCalledWith("mock-id", "mock-id");
            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(mockError);
        });
    });
});
