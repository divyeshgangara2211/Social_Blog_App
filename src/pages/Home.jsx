import React, { useEffect, useState } from 'react';
import { Container, PostCard, Logo, Button } from '../components';
import service from '../services/config.js';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 8;
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const limit = postsPerPage;
      const offset = (currentPage - 1) * postsPerPage;
      const response = await service.getPosts([], limit, offset);
      if (response) {
        setPosts(response.documents);
        setTotalPages(Math.ceil(response.total / postsPerPage));
      }
    };
    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleGetStarted = () => {
    if (authStatus) {
      navigate('/add-post');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 pb-16">
      <Container>
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center py-16 animate-fade-in">
          <Logo width="90px" />
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Welcome to <span className="text-blue-400">SocialHub</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl">
            Connect, share, and discover amazing stories from people around the world. Join the conversation and be part of our vibrant community!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-full shadow-lg animate-bounce-slow"
              onClick={handleGetStarted}
            >
              {authStatus ? 'Create a Post' : 'Join SocialHub'}
            </Button>
            <Link to="/all-posts">
              <Button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 text-lg rounded-full shadow-lg">
                Explore Posts
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured/Latest Posts Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">{posts.length > 0 ? 'Latest Posts' : 'No Posts Yet'}</h2>
          {posts.length > 0 ? (
            <div className="flex flex-wrap -mx-2 justify-center">
              {posts.slice(0, 4).map((post) => (
                <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <img src="/placeholder.png" alt="No posts" className="w-32 h-32 mb-6 opacity-60" />
              <p className="text-lg text-gray-400">No posts have been published yet. Be the first to share your story!</p>
              <Button
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg"
                onClick={handleGetStarted}
              >
                {authStatus ? 'Create Your First Post' : 'Join SocialHub'}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;