import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api';


function PostList() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        axiosInstance.get('/api/posts')
            .then(response => {
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setError('Error fetching posts');
            });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='w-full text-emerald-600' >
            <h2 className="text-3xl font-bold mb-4 text-center font-style">Blogs</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {posts.length === 0 && <p>No posts available.</p>}

                {posts.map(post => (
                    <Link key={post.id} to={`/blogPage/post/${post.id}`} className="bg-orange-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            {post.author && post.author.username ? (
                                <>By {post.author.username}</>
                            ) : (
                                <>Unknown Author</>
                            )}
                        </p>
                        <p className="text-gray-700">
                            {post.text.length > 50 ? `${post.text.substring(0, 50)}...` : post.text}
                        </p>
                    </Link>           
                ))}
            </div>
            
        </div>
    );
}

export default PostList;
