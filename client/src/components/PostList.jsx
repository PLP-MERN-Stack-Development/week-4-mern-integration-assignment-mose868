import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      const response = await postService.getAllPosts(page);
      setPosts(prevPosts => 
        page === 1 ? response.data : [...prevPosts, ...response.data]
      );
      setHasMore(response.pagination.page < response.pagination.pages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading && page === 1) {
    return <div className="text-center py-4">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <article key={post._id} className="bg-white rounded-lg shadow-md p-6">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
          )}
          <h2 className="text-2xl font-bold mb-2">
            <Link to={`/posts/${post.slug}`} className="hover:text-blue-600">
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>By {post.author.name}</span>
              <span>•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{post.comments.length} comments</span>
              <span>•</span>
              <span>{post.viewCount} views</span>
            </div>
          </div>
        </article>
      ))}
      {hasMore && (
        <div className="text-center py-4">
          <button
            onClick={() => setPage(p => p + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList; 