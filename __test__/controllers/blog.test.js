// const controller = require("../../controllers/blog.controller");
// const blogService = require("../../services/blog.service");
// const calcLimitAndOffset = require("../../utils/calculateLimitAndOffset");
// const mockBlogList = require("../testDB");

// jest.mock("../../utils/calculateLimitAndOffset");

// describe("Testing blogControllers.", () => {
//     describe("1. createBlog method.", () => {
//         it("Test-case 1: Should create a blog with status code 201", async () => {
//             const req = {
//                 body: {
//                     title: "test blog",
//                     blogContent: "test content.",
//                 },
//                 loggedInUserId: "c02e43c9-0786-44db-8089-2355cccf5850",
//             };

//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//             };

//             const next = jest.fn();

//             const mockCreatedBlog = {
//                 title: "test blog",
//                 blogContent: "test content.",
//                 userId: "c02e43c9-0786-44db-8089-2355cccf5850",
//             };

//             jest.spyOn(blogService, "createBlog").mockResolvedValue(mockCreatedBlog);

//             // Act
//             await controller.createBlog(req, res, next);

//             expect(blogService.createBlog).toHaveBeenCalledWith(
//                 "test blog",
//                 "test content.",
//                 "c02e43c9-0786-44db-8089-2355cccf5850"
//             );
//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.send).toHaveBeenCalledWith("Blog created successfully.");
//             expect(next).not.toHaveBeenCalled();
//         });

//         it("Test-case 2: Should throw Internal server error with status code 500", async () => {
//             const req = {
//                 body: {
//                     title: "test blog",
//                     blogContent: "test content.",
//                 },
//                 loggedInUserId: "c02e43c9-0786-44db-8089-2355cccf5850",
//             };

//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//             };

//             const next = jest.fn();

//             jest.spyOn(blogService, "createBlog").mockRejectedValue(
//                 new Error("Internal server error")
//             );

//             await controller.createBlog(req, res, next);

//             expect(next).toHaveBeenCalledWith(expect.any(Error));
//         });
//     });

//     describe("2. getAllBlogs method.", () => {
//         it("Test-case 1: Should Get blogList with status code 200", async () => {
//             const req = {
//                 query: {
//                     page: 1,
//                     size: 5,
//                 },
//             };
//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//                 get: jest.fn().mockReturnValue("mock-type"),
//             };
//             const next = jest.fn();

//             calcLimitAndOffset.mockResolvedValue({ limit: 5, offset: 0 });

//             jest.spyOn(blogService, "getAllBlogs").mockResolvedValue(mockBlogList);

//             // Act
//             await controller.getAllBlogs(req, res, next);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.send).toHaveBeenCalledWith(mockBlogList);
//             expect(next).not.toHaveBeenCalled();
//         });

//         it("Test-case 2: Should throw Internal server error with status code 500", async () => {
//             const req = {
//                 query: {
//                     page: 1,
//                     size: 5,
//                 },
//             };
//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//                 get: jest.fn().mockReturnValue("mock-type"),
//             };
//             const next = jest.fn();

//             calcLimitAndOffset.mockResolvedValue({ limit: 5, offset: 0 });

//             const mockError = new Error("Internal server error.");

//             jest.spyOn(blogService, "getAllBlogs").mockRejectedValue(mockError);

//             // Act
//             await controller.getAllBlogs(req, res, next);

//             expect(next).toHaveBeenCalledWith(mockError);
//         });
//     });

//     describe("3. getBlogById method.", () => {
//         it("Test-case 1: Should Get one blog by id with status code 200", async () => {
//             const req = { params: { id: "04438a25-357b-490e-9812-5da78ca40599" } };
//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//                 get: jest.fn().mockReturnValue("mock-type"),
//             };
//             const next = jest.fn();
//             const mockBlogById = {
//                 title: "test blog",
//                 blogContent: "test content.",
//                 userId: "c02e43c9-0786-44db-8089-2355cccf5850",
//             };

//             jest.spyOn(blogService, "getBlogById").mockResolvedValue(mockBlogById);

//             // Act
//             await controller.getBlogById(req, res, next);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.send).toHaveBeenCalledWith(mockBlogById);
//             expect(next).not.toHaveBeenCalled();
//         });

//         it("Test-case 2: Should throw Internal server Error with status code 500", async () => {
//             const req = { params: { id: "04438a25-357b-490e-9812-5da78ca40599" } };
//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//                 get: jest.fn().mockReturnValue("mock-type"),
//             };
//             const next = jest.fn();
//             const mockBlogById = {
//                 title: "test blog",
//                 blogContent: "test content.",
//                 userId: "c02e43c9-0786-44db-8089-2355cccf5850",
//             };

//             const mockError = new Error("Internal server error");

//             jest.spyOn(blogService, "getBlogById").mockRejectedValue(mockError);

//             // Act
//             await controller.getBlogById(req, res, next);

//             // Assert
//             expect(next).toHaveBeenCalledWith(mockError);
//         });
//     });

//     describe("4. updateBlogById method.", () => {
//         it("Test-case 1: Should Update blog by id with status code 200", async () => {
//             const req = {
//                 params: { id: "04438a25-357b-490e-9812-5da78ca40599" },
//                 body: {
//                     title: "test title",
//                     blogContent: "test content",
//                 },
//                 loggedInUserId: "c02e43c9-0786-44db-8089-2355cccf5850",
//             };
//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//             };
//             const next = jest.fn();
//             const mockUpdatedBlog = {
//                 id: "04438a25-357b-490e-9812-5da78ca40599",
//                 title: "test blog",
//                 blogContent: "test content.",
//                 userId: "c02e43c9-0786-44db-8089-2355cccf5850",
//             };

//             jest.spyOn(blogService, "updateBlogById").mockResolvedValue(mockUpdatedBlog);

//             // Act
//             await controller.updateBlogById(req, res, next);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.send).toHaveBeenCalledWith("Blog updated successfully.");
//             expect(next).not.toHaveBeenCalled();
//         });

//         it("Test-case 2: Should throw Internal server error with status 500", async () => {
//             const req = {
//                 params: { id: "04438a25-357b-490e-9812-5da78ca40599" },
//                 body: {
//                     title: "test title",
//                     blogContent: "test content",
//                 },
//                 loggedInUserId: "c02e43c9-0786-44db-8089-2355cccf5850",
//             };
//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//             };
//             const next = jest.fn();
//             const mockUpdatedBlog = {
//                 id: "04438a25-357b-490e-9812-5da78ca40599",
//                 title: "test blog",
//                 blogContent: "test content.",
//                 userId: "c02e43c9-0786-44db-8089-2355cccf5850",
//             };

//             const mockError = new Error("Internal server error");

//             jest.spyOn(blogService, "updateBlogById").mockRejectedValue(mockError);

//             // Act
//             await controller.updateBlogById(req, res, next);

//             expect(next).toHaveBeenCalledWith(mockError);
//         });
//     });

//     describe("5. deleteBlogById method.", () => {
//         it("Test-case 1: Should delete a blog by its id with status code 200", async () => {
//             const req = {
//                 params: { id: "04438a25-357b-490e-9812-5da78ca40599" },
//                 loggedInUserId: "c02e43c9-0786-44db-8089-2355cccf5850",
//             };
//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//             };
//             const next = jest.fn();

//             jest.spyOn(blogService, "deleteBlogById").mockResolvedValue();

//             // Act
//             await controller.deleteBlogById(req, res, next);

//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.send).toHaveBeenCalledWith("Blog deleted successfully.");
//             expect(next).not.toHaveBeenCalled();
//         });

//         it("Test-case 2: Should delete a blog by its id with status code 200", async () => {
//             const req = {
//                 params: { id: "04438a25-357b-490e-9812-5da78ca40599" },
//                 loggedInUserId: "c02e43c9-0786-44db-8089-2355cccf5850",
//             };
//             const res = {
//                 status: jest.fn().mockReturnThis(),
//                 send: jest.fn(),
//             };
//             const next = jest.fn();

//             const mockError = new Error("Internal server error");

//             jest.spyOn(blogService, "deleteBlogById").mockRejectedValue(mockError);

//             // Act
//             await controller.deleteBlogById(req, res, next);

//             expect(next).toHaveBeenCalledWith(mockError);
//         });
//     });
// });
