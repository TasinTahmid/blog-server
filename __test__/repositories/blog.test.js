const blogRepo = require("../../repositories/blog.repository");
const Blog = require("../../models/blog.model");
const blogList = require("../testDB");

describe("Testing blogRepositories.", () => {
    describe("1. createBlog method.", () => {
        it("Test-case 1: Should add a new blog into Database", async () => {
            const mockBlogData = {
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

            jest.spyOn(Blog, "create").mockReturnValue(mockCreatedBlog);

            // Act
            await blogRepo.createBlog(mockBlogData);

            // Assert
            expect(blogRepo.createBlog(mockCreatedBlog)).resolves.toBe(
                mockCreatedBlog
            );
        });

        // it("Test-case 2: Internal server error, status code 500", async () => {
        //     const title = "test title";
        //     const blogContent = "test content";
        //     const loggedInUserId = "c02e43c9-0786-44db-8089-2355cccf5850";

        //     const mockDTOBlog = {
        //         title: "test blog",
        //         blogContent: "test content.",
        //         userId: "c02e43c9-0786-44db-8089-2355cccf5850",
        //     };
        //     const mockCreatedBlog = {
        //         id: "04438a25-357b-490e-9812-5da78ca40599",
        //         title: "test blog",
        //         blogContent: "test content.",
        //         userId: "c02e43c9-0786-44db-8089-2355cccf5850",
        //     };

        //     jest.spyOn(blogDTO, "CreateBlog").mockReturnValue(mockDTOBlog);
        //     jest.spyOn(blogRepo, "createBlog").mockRejectedValue(
        //         new Error("Internal server error")
        //     );

        //     // Act & Assert
        //     await expect(
        //         blogService.createBlog(title, blogContent, loggedInUserId)
        //     ).rejects.toThrow(expect.any(Error));
        // });
    });

//     describe("2. getAllBlogs method.", () => {
//         it("Test-case 1: Should get the blogList from database", async () => {
//             const limit = 5;
//             const offset = 0;

//             jest.spyOn(Blog, "findAll").mockResolvedValue(blogList);

//             // Act
//             await blogRepo.getAllBlogs(limit, offset);

//             // Assert
//             expect(blogRepo.getAllBlogs(limit, offset)).resolves.toBe(blogList);
//         });
//     });

//     describe("3. getBlogById method.", () => {
//         it("Test-case 1: Gets one blog by id, status code 200", async () => {
//             const id = "04438a25-357b-490e-9812-5da78ca40599";

//             const mockBlogById = {
//                 title: "test blog",
//                 blogContent: "test content.",
//                 userId: "c02e43c9-0786-44db-8089-2355cccf5850",
//             };

//             jest.spyOn(Blog, "findOne").mockResolvedValue(mockBlogById);
//             // Act
//             await blogRepo.getBlogById(id);

//             // Assert
//             expect(blogRepo.getBlogById()).resolves.toBe(mockBlogById);
//         });
//     });

//     describe("4. updateBlogById method.", () => {
//         it("Test-case 1: Should update a blog by its id inside database", async () => {
//             const mockUpdatedBlog = {
//                 id: "blog-id",
//                 title: "test blog",
//                 blogContent: "test content.",
//                 userId: "author-id",
//             };

//             const blog = {
//                 update: jest.fn().mockReturnValue(mockUpdatedBlog),
//             };

//             // Act
//             await blogRepo.updateBlogById(blog, mockUpdatedBlog);

//             // Assert
//             expect(
//                 blogRepo.updateBlogById(blog, mockUpdatedBlog)
//             ).resolves.toBe(mockUpdatedBlog);
//         });
//     });

//     describe("5. deleteBlogById method.", () => {
//         it("Test-case 1: Should delete a blog by its id from database", async () => {
//             const mockDeletedBlog = {
//                 id: "blog-id",
//                 title: "test blog",
//                 blogContent: "test content.",
//                 userId: "author-id",
//             };

//             const blog = {
//                 destroy: jest.fn().mockReturnValue(mockDeletedBlog),
//             };

//             // Act
//             await blogRepo.deleteBlogById(blog);

//             // Assert
//             expect(blogRepo.deleteBlogById(blog)).resolves.toBe(
//                 mockDeletedBlog
//             );
//         });
//     });
//     describe("6. countNumberOfBlogs method.", () => {
//         it("Test-case 1: Should return total number of blogs present in database", async () => {
//             // Arrange
//             const mockBlogCount = 5;

//             jest.spyOn(Blog, "count").mockResolvedValue(mockBlogCount);

//             // Act
//             await blogRepo.countNumberOfBlogs();

//             // Assert
//             expect(blogRepo.countNumberOfBlogs()).resolves.toBe(mockBlogCount);
//         });
//     });
});
