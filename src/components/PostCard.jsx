import React from 'react';
import fileService from '../services/fileService.js';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  const imageUrl = fileService.getFilePreview(featuredImage);
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-800 rounded-2xl p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700'>
        <div className='w-full flex justify-center mb-4'>
          <img
            src={imageUrl}
            alt={title || 'Post image'}
            className='rounded-xl object-cover h-48 w-full border border-gray-700 bg-gray-900'
            onError={e => { e.target.src = '/placeholder.png'; }}
          />
        </div>
        <h2 className='text-xl font-bold text-white truncate'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;