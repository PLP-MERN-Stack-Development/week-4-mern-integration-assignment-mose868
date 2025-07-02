import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/api';
import CommentForm from './CommentForm';

const PostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await postService.getPost(slug);
      setPost(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await postService.deletePost(post._id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading post...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-4">Post not found</div>;
  }

  return (
    <article className="max-w-4xl mx-auto">
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-gray-600 mb-6">
        <span>By {post.author.name}</span>
        <span className="mx-2">•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="mx-2">•</span>
        <span>{post.viewCount} views</span>
      </div>
      <div className="prose max-w-none mb-8">{post.content}</div>
      <div className="flex items-center space-x-4 mb-8">
        {post.tags.map(tag => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Show edit/delete buttons for author or admin */}
      {post.author._id === localStorage.getItem('userId') && (
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => navigate(`/posts/${post._id}/edit`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Post
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Post
          </button>
        </div>
      )}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Comments ({post.comments.length})</h2>
        <CommentForm postId={post._id} onCommentAdded={fetchPost} />
        <div className="space-y-4 mt-6">
          {post.comments.map(comment => (
            <div key={comment._id} className="bg-gray-50 p-4 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{comment.user.name}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostDetail; 