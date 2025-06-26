import React from 'react';
import conf from '../conf/conf';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  
  // console.log('PostCard:', { $id, title, featuredImage });

  // Build the image URL directly from conf and featuredImage
  const imageUrl = featuredImage
    ? `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${featuredImage}/view?project=${conf.appwriteProjectId}`
    : null;

  // console.log('Image URL:', imageUrl);
  // console.log('file : ' ,conf.appwriteUrl);
  
  // we check if the image url is valid or not.
  const isValidImage = imageUrl && imageUrl.startsWith('http');

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-800 rounded-2xl p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700'>
        <div className='w-full flex justify-center mb-4 h-48 items-center bg-gray-900 rounded-xl'>
          {isValidImage ? (
            <img
              src={imageUrl}
              alt={title || 'Post image'}
              className='rounded-xl object-cover h-48 w-full border border-gray-700 bg-gray-900'
            />
          ) : (
            <span className="text-gray-500 text-lg">No image</span>
          )}
        </div>
        <h2 className='text-xl font-bold text-white truncate'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;