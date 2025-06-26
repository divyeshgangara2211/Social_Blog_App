import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import conf from '../conf/conf';
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {

    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                navigate("/");
            }
        });
    };

    // Build the image URL directly
    const imageUrl = post?.featuredImage
        ? `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${post.featuredImage}/view?project=${conf.appwriteProjectId}`
        : null;
    
    const isValidImage = imageUrl && imageUrl.startsWith('http');

    return post ? (
        <div className="py-8 min-h-screen bg-black">
            <Container>
                {/* Post Title */}
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 text-center drop-shadow-lg tracking-wide">
                        {post.title}
                    </h1>
                </div>

                {/* Image Card with Edit/Delete Buttons */}
                <div className="relative flex justify-center mb-8">
                    <div className="rounded-2xl shadow-2xl bg-gray-900 overflow-hidden max-w-3xl w-full flex flex-col items-center">
                        {/* Edit/Delete Buttons */}
                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex gap-2 z-10">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow hover:scale-105 hover:from-green-500 hover:to-green-700 transition-all duration-200">
                                        Edit
                                    </button>
                                </Link>
                                <button onClick={deletePost} className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold shadow hover:scale-105 hover:from-red-500 hover:to-red-700 transition-all duration-200">
                                    Delete
                                </button>
                            </div>
                        )}
                        {/* Image */}
                        <div className="w-full flex justify-center items-center bg-gray-800" style={{ minHeight: '350px', maxHeight: '500px' }}>
                            {isValidImage ? (
                                <img
                                    src={imageUrl}
                                    alt={post.title}
                                    className="object-contain w-full max-h-[500px] bg-gray-900"
                                />
                            ) : (
                                <span className="text-gray-500 text-lg">No image</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl p-8 shadow-lg text-white text-lg leading-relaxed">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post;