const { validateToken } = require("../../utils/jwt");
const userRepo = require("../../repositories/user.repository");
const authenticateUser = require("../../middlewares/authenticate-user.middleware");

jest.mock("../../utils/jwt");

describe("Testing authentication middleware.", () => {
    it("Test-case 1: Should proceed to the controller function by calling next without error.", async () => {
        // Arrange
        const req = {
            headers: {
                authorization: "Bearer mock-token",
            },
        };
        const res = {};
        const next = jest.fn();
        const mockUser = {
            id: "mock-id",
            username: "mock-username",
            email: "mock@gmail.com",
            password: "1234",
        };

        validateToken.mockReturnValue(mockUser);
        jest.spyOn(userRepo, "getUserById").mockResolvedValue(mockUser);

        // Act
        await authenticateUser(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).not.toHaveBeenCalledWith(expect.anything());
    });

    it("Test-case 2: Should throw 'Authentication needed' error by calling next with error when authorization header is missing.", async () => {
        // Arrange
        const req = {
            headers: {},
        };
        const res = {};
        const next = jest.fn();
        const mockUser = {
            id: "mock-id",
            username: "mock-username",
            email: "mock@gmail.com",
            password: "1234",
        };
        const mockError = new Error("Authentication needed.");
        validateToken.mockReturnValue(mockUser);
        jest.spyOn(userRepo, "getUserById").mockResolvedValue(mockUser);

        // Act
        await authenticateUser(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockError);
    });

    it("Test-case 3: Should throw 'Authentication needed' error by calling next with error when Bearer token is invalid or expired.", async () => {
        // Arrange
        const req = {
            headers: { authorization: "wrong mock-token" },
        };
        const res = {};
        const next = jest.fn();
        const mockUser = {
            id: "mock-id",
            username: "mock-username",
            email: "mock@gmail.com",
            password: "1234",
        };
        const mockError = new Error("Authentication needed.");
        validateToken.mockReturnValue(mockUser);
        jest.spyOn(userRepo, "getUserById").mockResolvedValue(mockUser);

        // Act
        await authenticateUser(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockError);
    });
    it("Test-case 4: Should throw 'Authentication needed' error by calling next with error when Bearer token doesn't have id.", async () => {
        // Arrange
        const req = {
            headers: { authorization: "Bearer mock-token" },
        };
        const res = {};
        const next = jest.fn();
        const mockUser = {
            id: "mock-id",
            username: "mock-username",
            email: "mock@gmail.com",
            password: "1234",
        };
        const mockError = new Error("Authentication needed.");
        validateToken.mockReturnValue({});
        jest.spyOn(userRepo, "getUserById").mockResolvedValue(mockUser);

        // Act
        await authenticateUser(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockError);
    });

    it("Test-case 5: Should throw 'Authentication needed' error by calling next with error when access-token is invalid or expired.", async () => {
        // Arrange
        const req = {
            headers: { authorization: "Bearer mock-token" },
        };
        const res = {};
        const next = jest.fn();
        const mockUser = {
            id: "mock-id",
            username: "mock-username",
            email: "mock@gmail.com",
            password: "1234",
        };
        const mockError = new Error("Authentication needed.");
        validateToken.mockReturnValue(mockUser);
        jest.spyOn(userRepo, "getUserById").mockResolvedValue(null);

        // Act
        await authenticateUser(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockError);
    });
});
