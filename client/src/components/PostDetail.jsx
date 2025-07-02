import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SAMPLE_POSTS = {
  '1': {
    _id: '1',
    title: 'Getting Started with MERN Stack',
    content: `The MERN stack is a powerful combination of technologies that allows you to build modern web applications. 
    
    MongoDB provides a flexible, scalable database solution. Express.js gives you a robust backend framework. React makes building user interfaces a breeze. And Node.js ties it all together with a JavaScript runtime that powers your server.
    
    In this post, we'll explore how to:
    - Set up your development environment
    - Create a MongoDB database
    - Build an Express.js server
    - Develop a React frontend
    - Connect all the pieces together`,
    author: { 
      _id: '101',
      name: 'John Doe' 
    },
    createdAt: new Date('2024-03-15'),
    comments: [
      {
        _id: 'c1',
        user: { name: 'Alice' },
        content: 'Great introduction to MERN stack!',
        createdAt: new Date('2024-03-15T10:00:00')
      },
      {
        _id: 'c2',
        user: { name: 'Bob' },
        content: 'Looking forward to trying this out.',
        createdAt: new Date('2024-03-15T11:30:00')
      }
    ],
    viewCount: 125,
    featuredImage: 'https://picsum.photos/800/400',
    tags: ['MERN', 'Web Development', 'JavaScript', 'Tutorial']
  }
};

const PostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = SAMPLE_POSTS[slug];

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
      <div className="prose max-w-none mb-8 whitespace-pre-wrap">{post.content}</div>
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
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Comments ({post.comments.length})</h2>
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