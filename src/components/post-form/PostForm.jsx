import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from '../index.js';
import conf from '../../conf/conf';
import fileService from '../../services/fileService.js';
import service from '../../services/config.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const [slug, setSlug] = useState(post?.slug || '');
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        const newSlug = slugTransform(value.title);
        setSlug(newSlug);
        setValue('slug', newSlug, { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  useEffect(() => {
    if (post && post.featuredImage) {
      const preview = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${post.featuredImage}/view?project=${conf.appwriteProjectId}`;
      setImagePreview(preview);
    }
  }, [post]);

  const submit = async (data) => {
    if (post) {
        // we check , if post already exist then we update it otherwise we create a new post.
      let file = null;
      if (data.image && data.image[0]) {
        file = await fileService.uploadFile(data.image[0]);
      }
      // if we get file then we need to delete the old file.
      if (file) {
        fileService.deleteFile(post.featuredImage);
      }
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        slug: slug, // always use generated slug
        featuredImage: file ? file.$id : post.featuredImage,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
        // Here we create a new post and navigate to the post page.
      let file = null;
      if (data.image && data.image[0]) {
        file = await fileService.uploadFile(data.image[0]);
      }
      if (file) {
        data.featuredImage = file.$id;
        data.slug = slug;
        const dbPost = await service.createPost({ ...data, userId: userData.$id });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  // Update image preview when a new file is selected
  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else if (post && post.featuredImage) {
      // fallback to existing image if no new file selected
      const preview = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${post.featuredImage}/view?project=${conf.appwriteProjectId}`;
      setImagePreview(preview);
    } else {
      setImagePreview('');
    }
  };

  // Only show the image if the preview URL is a real Appwrite URL (starts with http) or a local object URL (blob:)
  const isValidImage = imagePreview && (imagePreview.startsWith('http') || imagePreview.startsWith('blob:'));

  //Now, when you select a new image, the preview will immediately show the selected image—even before you update the post.

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800 text-white">
      {/* Left Column */}
      <div className="w-full md:w-2/3 px-2 space-y-6">
        <Input
          label="Title"
          placeholder="Enter a captivating title..."
          {...register('title', { required: true })}
        />
        <div>
          <label className="block mb-1 pl-1 text-gray-300 font-medium">Slug</label>
          <div className="px-3 py-2 rounded-lg bg-gray-800 text-gray-400 border border-gray-700 w-full select-all cursor-default">
            {slug || '—'}
          </div>
        </div>
        <RTE label="Content" name="content" control={control} defaultValue={getValues('content')} />
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/3 px-2 mt-6 md:mt-0 space-y-6">
        <div>
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
            {...register('image', { required: !post })}
            onChange={handleImageChange}
          />
          <div className="mt-4 w-full h-48 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-700">
            {isValidImage ? (
              <img
                src={imagePreview}
                alt={post?.title || 'Preview'}
                className="rounded-lg object-contain w-full h-44 shadow-md border border-gray-700"
              />
            ) : (
              <span className="text-gray-500 text-lg">No image selected</span>
            )}
          </div>
        </div>
        <Select
          label="Status"
          options={['active', 'inactive']}
          {...register('status', { required: true })}
        />
        <Button
          type="submit"
          className="w-full"
          bgColor={post ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
        >
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;