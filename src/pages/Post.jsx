import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import fileService from "../services/fileService";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";


function Post() {

    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false ;

    useEffect( () => {
        if(slug){
            service.getPost(slug).then( (post) => {
                if(post){
                    setPost(post);
                }else{
                    navigate("/");
                }
            });
        }else navigate("/");
    } ,[ slug , navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then( (status) => {
            if( status ){
                fileService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };  
    
    const imageUrl = post?.featuredImage ? fileService.getFileView(post.featuredImage) : null;
    
    const isValidImage = imageUrl && imageUrl.startsWith('http');

  return post ? (
    <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                {/* Featured Image */}
                <div className="w-full flex justify-center mb-6 relative rounded-xl overflow-hidden shadow-lg h-80 bg-gray-900 items-center">
                    {isValidImage ? (
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-500 text-lg">No image</span>
                    )}
                </div>

                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
    </div>
  ) : null ;
}

export default Post