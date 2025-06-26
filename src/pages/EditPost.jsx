import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import service from '../services/config';
import conf from '../conf/conf';
import { Container, PostForm } from '../components/index.js';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the post data using the slug
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    // Add imageUrl property for PostForm preview
                    post.imageUrl = post.featuredImage
                        ? `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${post.featuredImage}/view?project=${conf.appwriteProjectId}`
                        : null;
                    setPost(post);
                } else {
                    console.error('Post not found');
                    navigate('/'); // Redirect to home if post not found
                }
            });
        } else {
            console.error(' No slug provided for the post');
            navigate('/'); // Redirect to home if no slug provided
        }
    }, [slug, navigate]);

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;