const User = require("../../models/user.model");
const userRepo = require("../../repositories/user.repository");

describe("Testing userRepositories.", () => {
    describe("1. getUserByUsername method.", () => {
        it("Test-case 1: Should get a user by its id from Database", async () => {
            const username = "mock-username";
            const mockUserData = {
                id: "c02e43c9-0786-44db-8089-2355cccf5850",
                username: "mock-username",
                email: "mock-email",
                password: "1234",
            };

            jest.spyOn(User, "findOne").mockReturnValue(mockUserData);

            // Act
            await userRepo.getUserByUsername(username);

            // Assert
            expect(userRepo.getUserByUsername(username)).resolves.toBe(mockUserData);
        });
    });

    describe("2. getUserByEmail method.", () => {
        it("Test-case 1: Should get a user by its email from Database", async () => {
            const email = "mock-email";
            const mockUserData = {
                id: "c02e43c9-0786-44db-8089-2355cccf5850",
                username: "mock-username",
                email: "mock-email",
                password: "1234",
            };

            jest.spyOn(User, "findOne").mockReturnValue(mockUserData);

            // Act
            await userRepo.getUserByEmail(email);

            // Assert
            expect(userRepo.getUserByEmail(email)).resolves.toBe(mockUserData);
        });
    });

    describe("3. getUserById method.", () => {
        it("Test-case 1: Should get a user by its id from Database", async () => {
            const id = "mock-id";
            const mockUserData = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "1234",
            };

            jest.spyOn(User, "findOne").mockReturnValue(mockUserData);

            // Act
            await userRepo.getUserById(id);

            // Assert
            expect(userRepo.getUserById(id)).resolves.toBe(mockUserData);
        });
    });

    describe("4. createUser method.", () => {
        it("Test-case 1: Should create a new user into the Database", async () => {
            const mockUserData = {
                username: "mock-username",
                email: "mock-email",
                password: "1234",
            };
            const mockCreatedUserData = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "1234",
            };

            jest.spyOn(User, "create").mockReturnValue(mockCreatedUserData);

            // Act
            await userRepo.createUser(mockUserData);

            // Assert
            expect(userRepo.createUser(mockUserData)).resolves.toBe(mockCreatedUserData);
        });
    });

    describe("5. updateUserById method.", () => {
        it("Test-case 1: Should Update new user by its id into the Database", async () => {
            const mockUserData = {
                password: "1234",
            };
            const mockUpdatedUserData = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "1234",
            };

            const user = {
                update: jest.fn().mockResolvedValue(mockUpdatedUserData),
            };

            // Act
            await userRepo.updateUserById(user, mockUserData);

            // Assert
            expect(userRepo.updateUserById(user, mockUserData)).resolves.toBe(mockUpdatedUserData);
        });
    });

    describe("6. deleteUserById method.", () => {
        it("Test-case 1: Should Update new user by its id into the Database", async () => {
            const mockDeletedUserData = {
                id: "mock-id",
                username: "mock-username",
                email: "mock-email",
                password: "1234",
            };

            const user = {
                destroy: jest.fn().mockResolvedValue(mockDeletedUserData),
            };

            // Act
            await userRepo.deleteUserById(user);

            // Assert
            expect(userRepo.deleteUserById(user)).resolves.toBe(mockDeletedUserData);
        });
    });
});
