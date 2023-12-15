// const controller = require("../../controllers/user.controller");
// const userService = require("../../services/user.service");

// describe("Testing userControllers.", () => {
//     describe("1. register method.", () => {
//         it("Test-case 1: Should create a user with status code 201", async () => {
//             const req = {
//                 body: {
//                     username: "mock-username",
//                     email: "mock-email",
//                     password: "mock-password",
//                 },
//             };

//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//                 cookie: jest.fn().mockReturnValue("mock-token"),
//             };

//             const next = jest.fn();

//             const mockCreatedUser = {
//                 id: "mock-id",
//                 username: "mock-username",
//                 email: "mock-email",
//                 password: "mock-password",
//             };

//             jest.spyOn(userService, "register").mockResolvedValue(mockCreatedUser);

//             // Act
//             await controller.register(req, res, next);

//             // Assert
//             expect(userService.register).toHaveBeenCalledWith(
//                 "mock-username",
//                 "mock-email",
//                 "mock-password"
//             );
//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.send).toHaveBeenCalledWith("User registration successful.");
//             expect(next).not.toHaveBeenCalled();
//         });

//         it("Test-case 2: Should throw Internal server error with status code 500", async () => {
//             const req = {
//                 body: {
//                     username: "mock-username",
//                     email: "mock-email",
//                     password: "mock-password",
//                 },
//             };

//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//                 cookie: jest.fn().mockReturnValue("mock-token"),
//             };

//             const next = jest.fn();

//             const mockCreatedUser = {
//                 id: "mock-id",
//                 username: "mock-username",
//                 email: "mock-email",
//                 password: "mock-password",
//             };

//             const mockError = new Error("Internal server error.");

//             jest.spyOn(userService, "register").mockRejectedValue(mockError);

//             // Act
//             await controller.register(req, res, next);

//             // Assert
//             expect(userService.register).toHaveBeenCalledWith(
//                 "mock-username",
//                 "mock-email",
//                 "mock-password"
//             );
//             expect(res.status).not.toHaveBeenCalledWith(201);
//             expect(res.send).not.toHaveBeenCalledWith("User registration successful.");
//             expect(next).toHaveBeenCalledWith(mockError);
//         });
//     });

//     describe("2. login method.", () => {
//         it("Test-case 1: Should create a user with status code 201", async () => {
//             const req = {
//                 body: {
//                     email: "mock-email",
//                     password: "mock-password",
//                 },
//             };

//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//                 cookie: jest.fn().mockReturnValue("mock-token"),
//             };

//             const next = jest.fn();
//             const mockToken = "mock-token";

//             jest.spyOn(userService, "login").mockResolvedValue(mockToken);

//             // Act
//             await controller.login(req, res, next);

//             // Assert
//             expect(userService.login).toHaveBeenCalledWith("mock-email", "mock-password");
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.send).toHaveBeenCalledWith("User logged in successfully.");
//             expect(next).not.toHaveBeenCalled();
//         });

//         it("Test-case 2: Should throw Internal server error with status code 500", async () => {
//             const req = {
//                 body: {
//                     username: "mock-username",
//                     email: "mock-email",
//                     password: "mock-password",
//                 },
//             };

//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//                 cookie: jest.fn().mockReturnValue("mock-token"),
//             };

//             const next = jest.fn();

//             const mockError = new Error("Internal server error.");

//             jest.spyOn(userService, "login").mockRejectedValue(mockError);

//             // Act
//             await controller.login(req, res, next);

//             // Assert
//             expect(userService.login).toHaveBeenCalledWith("mock-email", "mock-password");
//             expect(res.status).not.toHaveBeenCalledWith(201);
//             expect(res.send).not.toHaveBeenCalledWith("User registration successful.");
//             expect(next).toHaveBeenCalledWith(mockError);
//         });
//     });

//     describe("3. updateUserById method.", () => {
//         it("Test-case 1: Should update a user by id.", async () => {
//             const req = {
//                 params: { id: "mock-id" },
//                 body: {
//                     oldPassword: "mock-password",
//                     newPassword: "mock-password",
//                 },
//                 loggedInUserId: "mock-id",
//             };

//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//                 cookie: jest.fn().mockReturnValue("mock-token"),
//             };

//             const next = jest.fn();

//             const mockUpdatedUser = {
//                 id: "mock-id",
//                 username: "mock-username",
//                 email: "mock-email",
//                 password: "mock-password",
//             };

//             jest.spyOn(userService, "updateUserById").mockResolvedValue(mockUpdatedUser);

//             // Act
//             await controller.updateUserById(req, res, next);

//             // Assert
//             expect(userService.updateUserById).toHaveBeenCalledWith(
//                 "mock-id",
//                 "mock-id",
//                 "mock-password",
//                 "mock-password"
//             );
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.send).toHaveBeenCalledWith("User updated successfully.");
//             expect(next).not.toHaveBeenCalled();
//         });

//         it("Test-case 2: Should throw Internal server error with status code 500", async () => {
//             const req = {
//                 params: { id: "mock-id" },
//                 body: {
//                     oldPassword: "mock-password",
//                     newPassword: "mock-password",
//                 },
//                 loggedInUserId: "mock-id",
//             };

//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//                 cookie: jest.fn().mockReturnValue("mock-token"),
//             };

//             const next = jest.fn();

//             const mockUpdatedUser = {
//                 id: "mock-id",
//                 username: "mock-username",
//                 email: "mock-email",
//                 password: "mock-password",
//             };
//             const mockError = new Error("Internal server error.");

//             jest.spyOn(userService, "updateUserById").mockRejectedValue(mockError);

//             // Act
//             await controller.updateUserById(req, res, next);

//             // Assert
//             expect(userService.updateUserById).toHaveBeenCalledWith(
//                 "mock-id",
//                 "mock-id",
//                 "mock-password",
//                 "mock-password"
//             );
//             expect(res.status).not.toHaveBeenCalled();
//             expect(res.send).not.toHaveBeenCalled();
//             expect(next).toHaveBeenCalledWith(mockError);
//         });
//     });

//     describe("4. deleteUserById method.", () => {
//         it("Test-case 1: Should delete a user by id from database.", async () => {
//             const req = {
//                 params: { id: "mock-id" },
//                 loggedInUserId: "mock-id",
//             };

//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//                 cookie: jest.fn().mockReturnValue("mock-token"),
//             };

//             const next = jest.fn();

//             const mockDeletedUser = {
//                 id: "mock-id",
//                 username: "mock-username",
//                 email: "mock-email",
//                 password: "mock-password",
//             };

//             jest.spyOn(userService, "deleteUserById").mockResolvedValue(mockDeletedUser);

//             // Act
//             await controller.deleteUserById(req, res, next);

//             // Assert
//             expect(userService.deleteUserById).toHaveBeenCalledWith("mock-id", "mock-id");
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.send).toHaveBeenCalledWith("User deleted successfully.");
//             expect(next).not.toHaveBeenCalled();
//         });

//         it("Test-case 2: Should throw Internal server error with status code 500", async () => {
//             const req = {
//                 params: { id: "mock-id" },
//                 loggedInUserId: "mock-id",
//             };

//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//                 cookie: jest.fn().mockReturnValue("mock-token"),
//             };

//             const next = jest.fn();

//             const mockDeletedUser = {
//                 id: "mock-id",
//                 username: "mock-username",
//                 email: "mock-email",
//                 password: "mock-password",
//             };
//             const mockError = new Error("Internal server error.");

//             jest.spyOn(userService, "deleteUserById").mockRejectedValue(mockError);

//             // Act
//             await controller.deleteUserById(req, res, next);

//             // Assert
//             expect(userService.deleteUserById).toHaveBeenCalledWith("mock-id", "mock-id");
//             expect(res.status).not.toHaveBeenCalled();
//             expect(res.send).not.toHaveBeenCalled();
//             expect(next).toHaveBeenCalledWith(mockError);
//         });
//     });
// });
