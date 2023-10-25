import React, { useState, useEffect } from "react";
import PostService from "../services/post.service"; // Replace with the actual path
import { format } from "date-fns";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    caption: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    PostService.createPost(formData)
      .then((response) => {
        console.log("Post created:", response);
        setSubmitting(false);
        setSubmittedSuccessfully(true);
        // Clear form fields
        setFormData({
          caption: "",
        });
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        setSubmitting(false);
        // Handle the error (e.g., show an error message)
      });
  };

  useEffect(() => {
    // Fetch all posts
    PostService.getAllPosts()
      .then((response) => {
        const currentUser = AuthService.getCurrentUser(); // Assuming you have a way to get the current user
        console.log("Current user:", currentUser);

        if (currentUser) {
          const filteredPosts = response.filter(
            (post) => {
              console.log("Post adminUser:", post.adminUser);
              console.log("Current user ID:", currentUser.id);
              return post.adminUser === currentUser.id;
            }
          );
          console.log("Filtered posts:", filteredPosts);
          setUserPosts(filteredPosts);
        }

        setLoadingPosts(false); // Mark loading as complete
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoadingPosts(false); // Mark loading as complete
      });
  }, []);

  const handleDeletePost = (postId) => {
    // Implement post deletion here, and then update the userPosts state after deletion
    PostService.deletePost(postId)
      .then(() => {
        // Filter out the deleted post and update the userPosts state
        setUserPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div className="container mx-auto flex flex-col items-center h-screen">
      <div className="w-full max-w-md">
        <div className="bg-gray-200 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold text-center mb-4">Create a Post</h3>
          {/* Create Post Form */}
          {submittedSuccessfully && (
            // Success message
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">Your post has been submitted successfully.</span>
              <span className="absolute top-0 right-0 px-4 py-3">
                {/* Close button */}
                <svg
                  className="fill-current h-6 w-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path
                    fillRule="evenodd"
                    d="M14.293 5.293a1 1 0 010 1.414L11.414 10l2.879 2.879a1 1 0 01-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 01-1.414-1.414L8.586 10 5.707 7.121a1 1 0 111.414-1.414L10 8.586l2.879-2.879a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          )}
          {loadingPosts ? (
            // Loading spinner
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            </div>
          ) : (
            // Create Post Form
            <form onSubmit={handleSubmit} className="mb-4">
              {/* Textarea for post caption */}
              <div className="mb-3 relative">
                <textarea
                  className="mt-1 block w-full h-20 border-gray-300 shadow-sm sm:text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border focus:border-indigo-500 pl-2 pt-2 placeholder-gray-400"
                  id="caption"
                  name="caption"
                  placeholder="Write your caption here"
                  value={formData.caption}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-auto mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
      {userPosts.length > 0 && (
        <div className="mt-4 flex-grow overflow-y-auto">
          {/* User's Posts */}
          <h3 className="text-2xl font-semibold text-center mb-4">Your Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userPosts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="p-4">
                  <h5 className="text-xl font-semibold mb-2">{post.caption}</h5>
                  <div className="text-gray-500">
                    {/* Format and display the submission date */}
                    {format(new Date(post.submittedAt), "MMM d, yyyy")}
                    <br />
                    {format(new Date(post.submittedAt), "h:mm a")}
                  </div>
                  <div className="mt-4 flex justify-between">
                    {/* Delete button */}
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md mr-2"
                    >
                      Delete
                    </button>
                    {/* Update button */}
                    <button className="text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-md">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
