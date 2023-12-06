const { validateToken } = require("../../utils/jwt");
const userRepo = require("../../repositories/user.repository");
const authenticateUser = require("../../middlewares/authenticate-user.middleware");

jest.mock("../../utils/jwt");

describe("Testing authentication middleware.", () => {
    it("Test-case 1: Should proceed to the controller function by calling next without error.", async () => {
        const req = {
            cookies: {
                "access-token": "mock-token",
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

    it("Test-case 2: Should throw 'Authentication needed' error by calling next with error when access-token is missing.", async () => {
        const req = {
            cookies: {},
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

    it("Test-case 3: Should throw 'Authentication needed' error by calling next with error when access-token is invalid or expired.", async () => {
        const req = {
            cookies: {
                "access-token": "mock-token",
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
