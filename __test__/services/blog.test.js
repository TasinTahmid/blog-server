const blogService = require("../../services/blog.service");
const blogRepo = require("../../repositories/blog.repository");
const blogDTO = require("../../dto/blog.dto");
const formatData = require("../../utils/formatData");
const blogList = require("../testDB");

jest.mock("../../utils/formatData");

describe("Testing blogServices.", () => {
    describe("1. createBlog method.", () => {
        it("Test-case 1: Blog created successfully, status code 201", async () => {
            const title = "test title";
            const blogContent = "test content";
            const loggedInUserId = "c02e43c9-0786-44db-8089-2355cccf5850";

            const mockDTOBlog = {
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

            // blogDTO.CreateBlog.mockReturnValue(mockDTOBlog);
            // jest.spyOn(blogDTO, "CreateBlog").mockReturnValue(mockDTOBlog);
            jest.spyOn(blogRepo, "createBlog").mockResolvedValue(mockCreatedBlog);

            // Act
            await blogService.createBlog(title, blogContent, loggedInUserId);

            // Assert
            // expect(blogDTO.CreateBlog).toHaveBeenCalledTimes(1);
            expect(blogRepo.createBlog).toHaveBeenCalledWith(expect.any(blogDTO.CreateBlog));
            // expect(blogRepo.createBlog).toHaveBeenCalledWith(mockDTOBlog);
        });

        it("Test-case 2: Internal server error, status code 500", async () => {
            const title = "test title";
            const blogContent = "test content";
            const loggedInUserId = "c02e43c9-0786-44db-8089-2355cccf5850";

            const mockDTOBlog = {
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

            jest.spyOn(blogDTO, "CreateBlog").mockReturnValue(mockDTOBlog);
            jest.spyOn(blogRepo, "createBlog").mockRejectedValue(
                new Error("Internal server error")
            );

            // Act & Assert
            await expect(
                blogService.createBlog(title, blogContent, loggedInUserId)
            ).rejects.toThrow(expect.any(Error));
        });
    });

    describe("2. getAllBlogs method.", () => {
        it("Test-case 1: Gets blogList, status code 200", async () => {
            const contentType = "mock-type";
            const limit = 5;
            const offset = 0;

            jest.spyOn(blogRepo, "getAllBlogs").mockResolvedValue(blogList);
            jest.spyOn(blogDTO, "GetAllBlogs").mockReturnValue(blogList);
            formatData.mockReturnValue(blogList);

            // Act
            await blogService.getAllBlogs(contentType, limit, offset);

            expect(formatData).toHaveBeenCalledWith(contentType, blogList);
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
            jest.spyOn(blogDTO, "GetBlogById").mockReturnValue(mockBlogById);
            formatData.mockResolvedValue(mockBlogById);

            // Act
            await blogService.getBlogById(id, contentType);

            // Assert
            expect(blogService.getBlogById()).resolves.toBe(mockBlogById);
        });

        it("Test-case 2: Should throw an Internal Server Error with status 500", async () => {
            const id = "04438a25-357b-490e-9812-5da78ca40599";
            const contentType = "mock-type";

            const mockBlogById = {
                title: "test blog",
                blogContent: "test content.",
                userId: "c02e43c9-0786-44db-8089-2355cccf5850",
            };

            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(null);
            jest.spyOn(blogDTO, "GetBlogById").mockReturnValue(mockBlogById);

            formatData.mockResolvedValue(mockBlogById);

            // Act & Assert
            expect(blogService.getBlogById(id, contentType)).rejects.toThrow(
                new Error("Blog not found.")
            );
        });
    });

    describe("4. updateBlogById method.", () => {
        it("Test-case 1: Updates blog by id, status code 200", async () => {
            const id = "blog-id";
            const title = "test title";
            const blogContent = "test content";
            const loggedInUserId = "author-id";

            const mockUpdatedBlog = {
                id: "blog-id",
                title: "test blog",
                blogContent: "test content.",
                userId: "author-id",
            };

            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(mockUpdatedBlog);
            jest.spyOn(blogDTO, "UpdateBlogById").mockReturnValue(mockUpdatedBlog);
            jest.spyOn(blogRepo, "updateBlogById").mockResolvedValue(mockUpdatedBlog);

            // Act
            await blogService.updateBlogById(id, title, blogContent, loggedInUserId);

            // Assert
            expect(
                blogService.updateBlogById(id, title, blogContent, loggedInUserId)
            ).resolves.toBe(mockUpdatedBlog);
        });

        it("Test-case 2: Should throw 'Blog not found' error with status code 404", async () => {
            const id = "blog-id";
            const title = "test title";
            const blogContent = "test content";
            const loggedInUserId = "author-id";

            const mockUpdatedBlog = {
                id: "blog-id",
                title: "test blog",
                blogContent: "test content.",
                userId: "author-id",
            };

            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(null);
            jest.spyOn(blogDTO, "UpdateBlogById").mockReturnValue(mockUpdatedBlog);
            jest.spyOn(blogRepo, "updateBlogById").mockResolvedValue(mockUpdatedBlog);

            // Act & Assert
            expect(
                blogService.updateBlogById(id, title, blogContent, loggedInUserId)
            ).rejects.toThrow(new Error("Blog not found."));
        });

        it("Test-case 3: Should throw 'User not authorized' error with status code 403", async () => {
            const id = "blog-id";
            const title = "test title";
            const blogContent = "test content";
            const loggedInUserId = "author-id";

            const mockUpdatedBlog = {
                id: "blog-id",
                title: "test blog",
                blogContent: "test content.",
                userId: "another-author-id",
            };

            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(mockUpdatedBlog);
            jest.spyOn(blogDTO, "UpdateBlogById").mockReturnValue(mockUpdatedBlog);
            jest.spyOn(blogRepo, "updateBlogById").mockResolvedValue(mockUpdatedBlog);

            // Act & Assert
            expect(
                blogService.updateBlogById(id, title, blogContent, loggedInUserId)
            ).rejects.toThrow(new Error("User is not authoroized to updated this blog."));
        });
    });

    describe("5. deleteBlogById method.", () => {
        it("Test-case 1: Should delete a blog by its id with status code 200", async () => {
            const id = "blog-id";
            const loggedInUserId = "author-id";

            const mockUpdatedBlog = {
                id: "blog-id",
                title: "test blog",
                blogContent: "test content.",
                userId: "author-id",
            };

            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(mockUpdatedBlog);
            jest.spyOn(blogRepo, "deleteBlogById").mockResolvedValue(mockUpdatedBlog);

            // Act
            await blogService.deleteBlogById(id, loggedInUserId);

            // Assert
            expect(blogService.deleteBlogById(id, loggedInUserId)).resolves.toBe(mockUpdatedBlog);
        });

        it("Test-case 2: Should throw 'Blog not found' error with status code 404", async () => {
            const id = "blog-id";
            const loggedInUserId = "author-id";

            const mockUpdatedBlog = {
                id: "blog-id",
                title: "test blog",
                blogContent: "test content.",
                userId: "author-id",
            };

            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(null);
            jest.spyOn(blogRepo, "deleteBlogById").mockResolvedValue(mockUpdatedBlog);

            // Act & Assert
            expect(blogService.deleteBlogById(id, loggedInUserId)).rejects.toThrow(
                new Error("Blog not found.")
            );
        });

        it("Test-case 3: Should throw 'User not authorized' error with status code 403", async () => {
            const id = "blog-id";
            const loggedInUserId = "author-id";

            const mockUpdatedBlog = {
                id: "blog-id",
                title: "test blog",
                blogContent: "test content.",
                userId: "another-author-id",
            };

            jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(mockUpdatedBlog);
            jest.spyOn(blogRepo, "deleteBlogById").mockResolvedValue(mockUpdatedBlog);

            // Act & Assert
            expect(blogService.deleteBlogById(id, loggedInUserId)).rejects.toThrow(
                new Error("User is not authoroized to delete this blog.")
            );
        });
    });
});
