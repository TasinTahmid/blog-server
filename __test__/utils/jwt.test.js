const jwt = require("jsonwebtoken");
const { createToken, validateToken } = require("../../utils/jwt");
const CustomError = require("../../utils/createCustomeError");

describe("Testing JWT module.", () => {
    describe("createToken method.", () => {
        const OLD_ENV = process.env;

        beforeEach(() => {
            jest.resetModules();
            process.env = { ...OLD_ENV };
        });

        afterAll(() => {
            process.env = OLD_ENV;
        });
        it("Test-case 1: Should return a mock-token.", async () => {
            // Arrange
            process.env.JWT_SECRET = "mock-secret";
            const userId = "mock-id";
            const mockToken = "mock-token";

            jest.spyOn(jwt, "sign").mockReturnValue(mockToken);

            // Act
            createToken(userId);

            // Assert
            expect(jwt.sign).toHaveBeenCalledWith(
                { id: userId },
                process.env.JWT_SECRET
            );
        });
    });

    describe("createToken method.", () => {
        const OLD_ENV = process.env;

        beforeEach(() => {
            jest.resetModules();
            process.env = { ...OLD_ENV };
        });

        afterAll(() => {
            process.env = OLD_ENV;
        });
        it("Test-case 1: Should return a mock user object in successful token varification.", async () => {
            // Arrange
            process.env.JWT_SECRET = "mock-secret";
            const token = "mock-token";
            const mockUser = {
                id: "mock-id",
            };

            jest.spyOn(jwt, "verify").mockReturnValue(mockUser);

            // Act
            validateToken(token);

            // Assert
            expect(jwt.verify).toHaveBeenCalledWith(
                token,
                process.env.JWT_SECRET
            );
        });

        it("Test-case 2: Should throw 'Authentication needed' error if token is invalid.", async () => {
            // Arrange
            process.env.JWT_SECRET = "mock-secret";
            const token = "mock-token";
            const mockError = new Error("Authentication needed.");

            jest.spyOn(jwt, "verify").mockImplementation(() => {
                throw new Error("Authentication needed.");
            });

            // Act & Assert
            validateToken(token);
            expect(validateToken(token)).toEqual(mockError);
        });
    });
});
