import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postService, categoryService } from '../services/api';

const PostForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: null,
    excerpt: '',
    isPublished: false,
  });

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postService.getPost(id);
      const post = response.data;
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category._id,
        tags: post.tags.join(', '),
        excerpt: post.excerpt || '',
        isPublished: post.isPublished,
      });
    } catch (err) {
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'tags') {
          formDataToSend.append(key, formData[key].split(',').map(tag => tag.trim()));
        } else if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (id) {
        await postService.updatePost(id, formDataToSend);
      } else {
        await postService.createPost(formDataToSend);
      }

      navigate('/');
    } catch (err) {
      setError('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return <div className="text-center py-4">Loading post...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>
      )}

      <div>
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="10"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Tags (comma separated)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Featured Image
        </label>
        <input
          type="file"
          name="featuredImage"
          onChange={handleChange}
          accept="image/*"
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Excerpt</label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows="3"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isPublished"
          checked={formData.isPublished}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-gray-700">Publish immediately</label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : id ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default PostForm; 