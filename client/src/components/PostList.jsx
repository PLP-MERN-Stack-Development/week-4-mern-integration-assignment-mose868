import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SAMPLE_POSTS = [
  {
    _id: '1',
    title: 'Getting Started with MERN Stack',
    excerpt: 'Learn how to build full-stack applications with MongoDB, Express, React, and Node.js.',
    content: 'The MERN stack is a powerful combination of technologies that allows you to build modern web applications...',
    author: { name: 'John Doe' },
    createdAt: new Date('2024-03-15'),
    comments: [],
    viewCount: 125,
    featuredImage: 'https://picsum.photos/800/400'
  },
  {
    _id: '2',
    title: 'React Hooks Explained',
    excerpt: 'A comprehensive guide to React Hooks and how to use them effectively in your applications.',
    content: 'React Hooks were introduced in React 16.8 to allow you to use state and other React features without writing a class...',
    author: { name: 'Jane Smith' },
    createdAt: new Date('2024-03-14'),
    comments: [],
    viewCount: 89,
    featuredImage: 'https://picsum.photos/800/401'
  },
  {
    _id: '3',
    title: 'MongoDB Best Practices',
    excerpt: 'Learn the best practices for designing and managing MongoDB databases.',
    content: 'When working with MongoDB, it\'s important to follow certain best practices to ensure optimal performance...',
    author: { name: 'Mike Johnson' },
    createdAt: new Date('2024-03-13'),
    comments: [],
    viewCount: 156,
    featuredImage: 'https://picsum.photos/800/402'
  }
];

const PostList = () => {
  const [posts] = useState(SAMPLE_POSTS);

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
            <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
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
    </div>
  );
};

export default PostList; 