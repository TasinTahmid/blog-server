const userService = require("../../services/user.service");
const userRepo = require("../../repositories/user.repository");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/jwt");

jest.mock("../../utils/jwt");

describe("Testing userServices.", () => {
    describe("1. register method.", () => {
        it("Test-case 1: Should create a user successfully into database with status code 201", async () => {
            // Arrange
            const username = "mock-username";
            const email = "mock-email";
            const password = "mock-password";

            const mockSalt = "mock-salt";
            const mockToken = "mock-token";
            const mockUser = {
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockCreatedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockResponse = {
                newUser: mockCreatedUser,
                token: mockToken,
            };
            jest.spyOn(userRepo, "getUserByUsername").mockResolvedValue(null);
            jest.spyOn(userRepo, "getUserByEmail").mockResolvedValue(null);
            jest.spyOn(bcrypt, "genSalt").mockReturnValue(mockSalt);
            jest.spyOn(bcrypt, "hash").mockReturnValue(password);
            jest.spyOn(userRepo, "createUser").mockResolvedValue(
                mockCreatedUser
            );
            createToken.mockReturnValue(mockToken);
            // Act
            await userService.register(mockUser);
            // Assert
            expect(userService.register(mockUser)).resolves.toEqual(
                mockResponse
            );
        });
        it("Test-case 2: Should throw an Error, User already exists by this username", async () => {
            // Arrange
            const username = "mock-username";
            const email = "mock-email";
            const password = "mock-password";

            const mockSalt = "mock-salt";
            const mockToken = "mock-token";
            const mockUser = {
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockCreatedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockError = new Error(
                "User already exists by this username."
            );
            jest.spyOn(userRepo, "getUserByUsername").mockResolvedValue(
                mockCreatedUser
            );
            jest.spyOn(userRepo, "getUserByEmail").mockResolvedValue(null);
            jest.spyOn(bcrypt, "genSalt").mockReturnValue(mockSalt);
            jest.spyOn(bcrypt, "hash").mockReturnValue(password);
            jest.spyOn(userRepo, "createUser").mockResolvedValue(
                mockCreatedUser
            );
            createToken.mockReturnValue(mockToken);
            // Act & Assert
            expect(userService.register(mockUser)).rejects.toThrow(mockError);
        });
        it("Test-case 3: Should throw an Error, User already exists by this email", async () => {
            // Arrange
            const username = "mock-username";
            const email = "mock-email";
            const password = "mock-password";

            const mockSalt = "mock-salt";
            const mockToken = "mock-token";
            const mockUser = {
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockCreatedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockError = new Error("User already exists by this email.");
            jest.spyOn(userRepo, "getUserByUsername").mockResolvedValue(null);
            jest.spyOn(userRepo, "getUserByEmail").mockResolvedValue(
                mockCreatedUser
            );
            jest.spyOn(bcrypt, "genSalt").mockReturnValue(mockSalt);
            jest.spyOn(bcrypt, "hash").mockReturnValue(password);
            jest.spyOn(userRepo, "createUser").mockResolvedValue(
                mockCreatedUser
            );
            createToken.mockReturnValue(mockToken);

            // Act & Assert
            expect(userService.register(mockUser)).rejects.toThrow(mockError);
        });
    });
    describe("2. login method.", () => {
        it("Test-case 1: Should login successfully by returning a access-token", async () => {
            // Arrange
            const email = "mock-email";
            const password = "mock-password";
            const mockToken = "mock-token";
            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockResponse = {
                sequelizeUser: mockUser,
                token: mockToken,
            };
            jest.spyOn(userRepo, "getUserByEmail").mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, "compare").mockReturnValue(true);
            createToken.mockReturnValue(mockToken);
            // Act
            await userService.login(email, password);
            // Assert
            expect(userService.login(email, password)).resolves.toEqual(
                mockResponse
            );
        });
        it("Test-case 2: Should throw an Error, User not found, with invalid email", async () => {
            // Arrange
            const email = "mock-email";
            const password = "mock-password";
            const mockToken = "mock-token";
            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockError = new Error("User not found.");

            jest.spyOn(userRepo, "getUserByEmail").mockResolvedValue(null);
            jest.spyOn(bcrypt, "compare").mockReturnValue(true);
            createToken.mockReturnValue(mockToken);
            // Act & Assert
            expect(userService.login(email, password)).rejects.toThrow(
                mockError
            );
        });
        it("Test-case 3: Should throw an Error, Invalid credentials, with incorrect pasword", async () => {
            // Arrange
            const email = "mock-email";
            const password = "mock-password";
            const mockToken = "mock-token";
            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockError = new Error("Invalid credentials.");

            jest.spyOn(userRepo, "getUserByEmail").mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, "compare").mockReturnValue(false);
            createToken.mockReturnValue(mockToken);
            // Act & Assert
            expect(userService.login(email, password)).rejects.toThrow(
                mockError
            );
        });
    });
    describe("3. updateUserById method.", () => {
        it("Test-case 1: Should update a user successfully by its id", async () => {
            // Arrange
            const id = "mock-id";
            const loggedInUserId = "mock-id";
            const oldPassword = "mock-password";
            const newPassword = "mock-newPassword";
            const mockSalt = "mock-salt";
            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockUpdatedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-newPassword",
            };
            const mockUpdateData = { password: "mock-newPassword" };
            jest.spyOn(userRepo, "getUserById").mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, "compare").mockReturnValue(true);
            jest.spyOn(bcrypt, "genSalt").mockReturnValue(mockSalt);
            jest.spyOn(bcrypt, "hash").mockReturnValue(newPassword);

            jest.spyOn(userRepo, "updateUserById").mockResolvedValue(
                mockUpdatedUser
            );
            // Act
            await userService.updateUserById(
                id,
                loggedInUserId,
                oldPassword,
                newPassword
            );
            // Assert
            expect(
                userService.updateUserById(
                    id,
                    loggedInUserId,
                    oldPassword,
                    newPassword
                )
            ).resolves.toBe(mockUpdatedUser);
        });
        it("Test-case 2: Should throw an Error, User not found, with invalid email", async () => {
            // Arrange
            const id = "mock-id";
            const loggedInUserId = "mock-id";
            const oldPassword = "mock-password";
            const newPassword = "mock-newPassword";
            const mockSalt = "mock-salt";
            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockUpdatedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-newPassword",
            };
            const mockUpdateData = { password: "mock-newPassword" };
            const mockError = new Error("User not found.");
            jest.spyOn(userRepo, "getUserById").mockResolvedValue(null);
            jest.spyOn(bcrypt, "compare").mockReturnValue(true);
            jest.spyOn(bcrypt, "genSalt").mockReturnValue(mockSalt);
            jest.spyOn(bcrypt, "hash").mockReturnValue(newPassword);
            jest.spyOn(userRepo, "updateUserById").mockResolvedValue(
                mockUpdatedUser
            );
            // Act & Assert
            expect(
                userService.updateUserById(
                    id,
                    loggedInUserId,
                    oldPassword,
                    newPassword
                )
            ).rejects.toThrow(mockError);
        });
        it("Test-case 3: Should throw an Error, User is not authorized, with incorrect loggedInUserId", async () => {
            // Arrange
            const id = "mock-id";
            const loggedInUserId = "wrong-id";
            const oldPassword = "mock-newPassword";
            const newPassword = "mock-newPassword";
            const mockSalt = "mock-salt";
            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockUpdatedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-newPassword",
            };
            const mockUpdateData = { password: "mock-newPassword" };
            const mockError = new Error("User is not authorized.");
            jest.spyOn(userRepo, "getUserById").mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, "compare").mockReturnValue(false);
            jest.spyOn(bcrypt, "genSalt").mockReturnValue(mockSalt);
            jest.spyOn(bcrypt, "hash").mockReturnValue(newPassword);
            jest.spyOn(userRepo, "updateUserById").mockResolvedValue(
                mockUpdatedUser
            );
            // Act & Assert
            expect(
                userService.updateUserById(
                    id,
                    loggedInUserId,
                    oldPassword,
                    newPassword
                )
            ).rejects.toThrow(mockError);
        });
        it("Test-case 4: Should throw an Error, Invalid credentials, with incorrect pasword", async () => {
            // Arrange
            const id = "mock-id";
            const loggedInUserId = "mock-id";
            const oldPassword = "wrong-password";
            const newPassword = "mock-newPassword";
            const mockSalt = "mock-salt";
            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockUpdatedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-newPassword",
            };
            const mockUpdateData = { password: "mock-newPassword" };
            const mockError = new Error("Invalid credentials.");
            jest.spyOn(userRepo, "getUserById").mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, "compare").mockReturnValue(false);
            jest.spyOn(bcrypt, "genSalt").mockReturnValue(mockSalt);
            jest.spyOn(bcrypt, "hash").mockReturnValue(newPassword);
            jest.spyOn(userRepo, "updateUserById").mockResolvedValue(
                mockUpdatedUser
            );
            // Act & Assert
            expect(
                userService.updateUserById(
                    id,
                    loggedInUserId,
                    oldPassword,
                    newPassword
                )
            ).rejects.toThrow(mockError);
        });
    });
    describe("4. deleteUserById method.", () => {
        it("Test-case 1: Should delete a user successfully by its id from database", async () => {
            // Arrange
            const id = "mock-id";
            const loggedInUserId = "mock-id";
            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockDeletedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-newPassword",
            };
            jest.spyOn(userRepo, "getUserById").mockResolvedValue(mockUser);
            jest.spyOn(userRepo, "deleteUserById").mockResolvedValue(
                mockDeletedUser
            );
            // Act
            await userService.deleteUserById(id, loggedInUserId);
            // Assert
            expect(
                userService.deleteUserById(id, loggedInUserId)
            ).resolves.toBe(mockDeletedUser);
        });
        it("Test-case 2: Should throw an Error, User not found, with invalid id", async () => {
            // Arrange
            const id = "mock-id";
            const loggedInUserId = "mock-id";
            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockDeletedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-newPassword",
            };
            const mockError = new Error("User not found.");
            jest.spyOn(userRepo, "getUserById").mockResolvedValue(null);
            jest.spyOn(userRepo, "deleteUserById").mockResolvedValue(
                mockDeletedUser
            );
            // Act & Assert
            expect(
                userService.deleteUserById(id, loggedInUserId)
            ).rejects.toThrow(mockError);
        });
        it("Test-case 3: Should throw an Error, User is not authorized, with incorrect loggedInUserId", async () => {
            // Arrange
            const id = "mock-id";
            const loggedInUserId = "wrong-mock-id";
            const mockUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-password",
            };
            const mockDeletedUser = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "mock-newPassword",
            };
            const mockError = new Error("User is not authorized.");
            jest.spyOn(userRepo, "getUserById").mockResolvedValue(mockUser);
            jest.spyOn(userRepo, "deleteUserById").mockResolvedValue(
                mockDeletedUser
            );
            // Act & Assert
            expect(
                userService.deleteUserById(id, loggedInUserId)
            ).rejects.toThrow(mockError);
        });
    });
});
