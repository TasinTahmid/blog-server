const controller = require("../../controllers/blog.controller");
const blogService = require("../../services/blog.service");

describe("Testing blogControllers.", () => {
    describe("Testing createBlog method.", () => {
        class Values {
            constructor(body, loggedInUserId) {
                this.req = { body, loggedInUserId };
                this.res = {
                    status: jest.fn(),
                    send: jest.fn(),
                };
                this.next = jest.fn();
                this.mockCreatedBlog = {
                    title: this.req.body.title,
                    blogContent: this.req.body.blogContent,
                    userId: this.req.loggedInUserId,
                };
            }
        }

        it("Test-case 1: Blog created successfully, status code 201", async () => {
            const { req, res, next, mockCreatedBlog } = new Values(
                {
                    title: "test blog",
                    blogContent: "test content.",
                },
                "c02e43c9-0786-44db-8089-2355cccf5850"
            );

            jest.spyOn(blogService, "createBlog").mockResolvedValue(mockCreatedBlog);

            await controller.createBlog(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(next).not.toHaveBeenCalled();
        });

        it("Test-case 2: Internal server error, status code 500", async () => {
            const { req, res, next } = new Values(
                {
                    title: "test blog",
                    blogContent: "test content.",
                },
                "c02e43c9-0786-44db-8089-2355cccf5850"
            );

            jest.spyOn(blogService, "createBlog").mockRejectedValue(
                new Error("Internal server error")
            );

            await controller.createBlog(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});
