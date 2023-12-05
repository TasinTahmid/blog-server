const controller = require("../../controllers/blog.controller");
const blogService = require("../../services/blog.service");
const calcLimitAndOffset = require("../../utils/calculateLimitAndOffset");
const mockBlogList = require("../testDB");

jest.mock("../../utils/calculateLimitAndOffset");

describe("Testing blogControllers.", () => {
    describe("1. Testing createBlog method.", () => {
        it("Test-case 1: Blog created successfully, status code 201", async () => {
            const req = {
                body: {
                    title: "test blog",
                    blogContent: "test content.",
                },
                loggedInUserId: "c02e43c9-0786-44db-8089-2355cccf5850",
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            const next = jest.fn();

            const mockCreatedBlog = {
                title: "test blog",
                blogContent: "test content.",
                userId: "c02e43c9-0786-44db-8089-2355cccf5850",
            };

            jest.spyOn(blogService, "createBlog").mockResolvedValue(mockCreatedBlog);

            // Act
            await controller.createBlog(req, res, next);

            expect(blogService.createBlog).toHaveBeenCalledWith(
                "test blog",
                "test content.",
                "c02e43c9-0786-44db-8089-2355cccf5850"
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith("Blog created successfully.");
            expect(next).not.toHaveBeenCalled();
        });

        it("Test-case 2: Internal server error, status code 500", async () => {
            const req = {
                body: {
                    title: "test blog",
                    blogContent: "test content.",
                },
                loggedInUserId: "c02e43c9-0786-44db-8089-2355cccf5850",
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            const next = jest.fn();

            jest.spyOn(blogService, "createBlog").mockRejectedValue(
                new Error("Internal server error")
            );

            await controller.createBlog(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe("2. Testing getAllBlogs method.", () => {
        it("Test-case 1: Gets blogList, status code 200", async () => {
            const req = {
                query: {
                    page: 1,
                    size: 5,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                get: jest.fn().mockReturnValue("mock-type"),
            };
            const next = jest.fn();

            calcLimitAndOffset.mockResolvedValue({ limit: 5, offset: 0 });

            jest.spyOn(blogService, "getAllBlogs").mockResolvedValue(mockBlogList);

            // Act
            await controller.getAllBlogs(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockBlogList);
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("3. Testing getBlogById method.", () => {
        it("Test-case 1: Gets one blog by id, status code 200", async () => {
            const req = { params: { id: "04438a25-357b-490e-9812-5da78ca40599" } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                get: jest.fn().mockReturnValue("mock-type"),
            };
            const next = jest.fn();
            const mockBlogById = {
                title: "test blog",
                blogContent: "test content.",
                userId: "c02e43c9-0786-44db-8089-2355cccf5850",
            };

            jest.spyOn(blogService, "getBlogById").mockResolvedValue(mockBlogById);

            // Act
            await controller.getBlogById(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockBlogById);
            expect(next).not.toHaveBeenCalled();
        });
    });
});
