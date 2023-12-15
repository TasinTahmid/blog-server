const blogService = require("../../services/blog.service");
const blogRepo = require("../../repositories/blog.repository");
const blogList = require("../testDB");

describe("Testing blogServices.", () => {
    describe("1. createBlog method.", () => {
        it("Test-case 1: Blog created successfully, status code 201", async () => {
            const mockBlog = {
                title: "test blog",
                blogContent: "test content.",
                userId: "c02e43c9-0786-44db-8089-2355cccf5850",
            };
            const mockCreatedBlog = {
                id: "04438a25-357b-490e-9812-5da78ca40599",
                title: "test blog",
                blogContent: "test content.",
                userId: "c02e43c9-0786-44db-8089-2355cccf5850",
            };
            jest.spyOn(blogRepo, "createBlog").mockResolvedValue(
                mockCreatedBlog
            );
            // Act
            await blogService.createBlog(mockBlog);
            // Assert
            expect(blogRepo.createBlog).toHaveBeenCalledWith(mockBlog);
        });
        it("Test-case 2: Internal server error, status code 500", async () => {
            // Arrange
            const mockBlog = {
                id: "04438a25-357b-490e-9812-5da78ca40599",
                title: "test blog",
                blogContent: "test content.",
                userId: "c02e43c9-0786-44db-8089-2355cccf5850",
            };
            const mockError = new Error("Internal server error");
            jest.spyOn(blogRepo, "createBlog").mockRejectedValue(mockError);
            // Act & Assert
            await expect(blogService.createBlog(mockBlog)).rejects.toThrow(
                mockError
            );
        });
    });
    describe("2. getAllBlogs method.", () => {
        it("Test-case 1: Gets blogList, status code 200", async () => {
            // Arrange
            const limit = 5;
            const offset = 0;

            jest.spyOn(blogRepo, "getAllBlogs").mockResolvedValue(blogList);
            // Act
            await blogService.getAllBlogs(limit, offset);
            // Assert
            expect(blogRepo.getAllBlogs).toHaveBeenCalledWith(limit, offset);
        });
    });
    describe("3. getBlogById method.", () => {
        it("Test-case 1: Gets one blog by id, status code 200", async () => {
            const id = "04438a25-357b-490e-9812-5da78ca40599";
            const contentType = "mock-type";
            const mockBlogById = {
                title: "test blog",
                blogContent: "test content.",
                userId: "c02e43c9-0786-44db-8089-2355cccf5850",
            };
            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(mockBlogById);
            // Act & Assert
            expect(blogService.getBlogById(id)).resolves.toBe(mockBlogById);
        });
        it("Test-case 2: Should throw an Internal Server Error with status 500", async () => {
            const id = "04438a25-357b-490e-9812-5da78ca40599";
            const mockBlogById = {
                title: "test blog",
                blogContent: "test content.",
                userId: "c02e43c9-0786-44db-8089-2355cccf5850",
            };
            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(null);
            // Act & Assert
            expect(blogService.getBlogById(id)).rejects.toThrow(
                new Error("Blog not found.")
            );
        });
    });
    describe("4. updateBlogById method.", () => {
        it("Test-case 1: Updates blog by id, status code 200", async () => {
            const id = "blog-id";
            const mockBlogData = {
                title: "test blog",
                blogContent: "test content.",
                userId: "author-id",
            };
            const mockUpdatedBlog = {
                id: "blog-id",
                title: "test blog",
                blogContent: "test content.",
                userId: "author-id",
            };
            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(
                mockUpdatedBlog
            );
            jest.spyOn(blogRepo, "updateBlogById").mockResolvedValue(
                mockUpdatedBlog
            );
            // Act
            await blogService.updateBlogById(id, mockBlogData);
            // Assert
            expect(blogRepo.updateBlogById).toHaveBeenCalledWith(
                mockUpdatedBlog,
                mockBlogData
            );
        });
        it("Test-case 2: Should throw 'Blog not found' error with status code 404", async () => {
            const id = "blog-id";
            const mockBlogData = {
                title: "test blog",
                blogContent: "test content.",
                userId: "author-id",
            };
            const mockUpdatedBlog = {
                id: "blog-id",
                title: "test blog",
                blogContent: "test content.",
                userId: "author-id",
            };
            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(null);
            jest.spyOn(blogRepo, "updateBlogById").mockResolvedValue(
                mockUpdatedBlog
            );
            // Act & Assert
            expect(
                blogService.updateBlogById(id, mockBlogData)
            ).rejects.toThrow(new Error("Blog not found."));
        });
        it("Test-case 3: Should throw 'User not authorized' error with status code 403", async () => {
            const id = "blog-id";
            const mockBlogData = {
                title: "test blog",
                blogContent: "test content.",
                userId: "wrong-id",
            };
            const mockUpdatedBlog = {
                id: "blog-id",
                title: "test blog",
                blogContent: "test content.",
                userId: "author-id",
            };
            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(
                mockUpdatedBlog
            );
            jest.spyOn(blogRepo, "updateBlogById").mockResolvedValue(
                mockUpdatedBlog
            );
            // Act & Assert
            expect(
                blogService.updateBlogById(id, mockBlogData)
            ).rejects.toThrow(
                new Error("User is not authoroized to updated this blog.")
            );
        });
    });
    describe("5. deleteBlogById method.", () => {
        it("Test-case 1: Should delete a blog by its id with status code 200", async () => {
            const id = "blog-id";
            const loggedInUserId = "author-id";
            const mockDeletedBlog = {
                id: "blog-id",
                title: "test blog",
                blogContent: "test content.",
                userId: "author-id",
            };
            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(
                mockDeletedBlog
            );
            jest.spyOn(blogRepo, "deleteBlogById").mockResolvedValue(
                mockDeletedBlog
            );
            // Act
            await blogService.deleteBlogById(id, loggedInUserId);
            // Assert
            expect(
                blogService.deleteBlogById(id, loggedInUserId)
            ).resolves.toBe(mockDeletedBlog);
        });
        it("Test-case 2: Should throw 'Blog not found' error with status code 404", async () => {
            const id = "blog-id";
            const loggedInUserId = "author-id";
            const mockDeletedBlog = {
                id: "blog-id",
                title: "test blog",
                blogContent: "test content.",
                userId: "author-id",
            };
            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(null);
            jest.spyOn(blogRepo, "deleteBlogById").mockResolvedValue(
                mockDeletedBlog
            );
            // Act & Assert
            expect(
                blogService.deleteBlogById(id, loggedInUserId)
            ).rejects.toThrow(new Error("Blog not found."));
        });
        it("Test-case 3: Should throw 'User not authorized' error with status code 403", async () => {
            const id = "blog-id";
            const loggedInUserId = "author-id";
            const mockDeletedBlog = {
                id: "blog-id",
                title: "test blog",
                blogContent: "test content.",
                userId: "another-author-id",
            };
            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(
                mockDeletedBlog
            );
            jest.spyOn(blogRepo, "deleteBlogById").mockResolvedValue(
                mockDeletedBlog
            );
            // Act & Assert
            expect(
                blogService.deleteBlogById(id, loggedInUserId)
            ).rejects.toThrow(
                new Error("User is not authoroized to delete this blog.")
            );
        });
    });
});
