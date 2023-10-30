import React, { useEffect, useState } from 'react';
import PostCard from '../pages/posts/PostCard';
import PostService from '../services/post.service';
import ImageService from '../services/image.service';

const SkeletonCard = () => {
  return (
    <div className="my-4">
      <div className="bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg shadow-lg p-4">
        <div className="w-72 h-72 rounded overflow-hidden mb-4 mx-auto bg-gray-300"></div>
        <h2 className="text-xl font-bold mb-2">
          <div className="bg-gray-300 h-8 w-72 animate-pulse mb-2"></div>
        </h2>
        <div className="text-white">
          <p className="text-sm text-gray-200 mb-2">
            Posted on: <span className="bg-gray-300 w-100 h-6 animate-pulse"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Homepage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    Promise.all([
      PostService.getAllPosts(),
      ImageService.getAllImages(),
    ])
      .then(([posts, imageData]) => {
        // Sort posts by submittedAt in descending order (latest first)
        posts.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        setAllPosts(posts);
        setImages(imageData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      // Navigate to the next post when the down arrow key is pressed
      if (currentPostIndex < allPosts.length - 1) {
        setCurrentPostIndex(currentPostIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      // Navigate to the previous post when the up arrow key is pressed
      if (currentPostIndex > 0) {
        setCurrentPostIndex(currentPostIndex - 1);
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-300 to-grey-300">
      <div className="container mx-auto text-center" style={{ maxWidth: '500px' }}>
        <h2 className="text-3xl font-bold mb-8">FEEDS</h2>
        <div className="space-y-8">
          {loading ? (
            Array(3).fill().map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            allPosts.map((post, index) => (
              <PostCard
                key={post._id}
                post={post}
                image={images.find((image) => image.s3Key === post.post_image)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Homepage;
