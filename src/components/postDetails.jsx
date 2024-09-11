import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api';

function PostDetails() {
    const { postId } = useParams();  // Get post ID from the route
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');

    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');

    const [isLoading, setIsLoading] = useState(false);


    // Retrieve user info from localStorage
    const userId = localStorage.getItem('userId');  // Logged-in user's ID
    const userType = localStorage.getItem('userType');  // Logged-in user's type (User or Admin)


    // Fetch the post and comments
    useEffect(() => {
        axiosInstance.get(`/api/posts/${postId}`)
            .then(response => {
                setPost(response.data.post);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });

        axiosInstance.get(`/api/comments/${postId}/comments`)  // Fetch all comments for the post
            .then(response => {
                // Ensure the response is an array
                if (Array.isArray(response.data.comments)) {
                    setComments(response.data.comments);
                } else {
                    setComments([]);  // Fallback in case comments are not an array
                }
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [postId]);

    // Handle submitting a new comment
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        axiosInstance.post('/api/comments', {
            text: newComment,
            parentId: postId  
        })
        .then(response => {
            setComments([...comments, response.data]);  
            setNewComment('');        
            window.location.reload();  
        })
        .catch(error => {
            console.error('Error submitting comment:',  error.response?.data || error.message);
            setError('Error submitting comment');
        })
        .finally(() => setIsLoading(false));
    };

    //Handle Editing of Comments
    const handleEdit = (commentId, commentText) => {
        setEditCommentId(commentId);
        setEditCommentText(commentText);
    };

    const handleUpdateComment = (e) => {
        e.preventDefault();
        setIsLoading(true);

        axiosInstance.patch(`/api/comments/${editCommentId}`, { text: editCommentText })
            .then(response => {
                const updatedComment = response.data;

                const updatedComments = comments.map(comment =>
                    comment.id === editCommentId ? updatedComment : comment
                );
                setComments(updatedComments);
                setEditCommentId(null);  // Clear the edit form
                setEditCommentText('');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error updating comment:', error);
            })
            .finally(() => setIsLoading(false));
    };

    // Handle deleting a comment
    const handleDelete = (commentId) => {
        axiosInstance.delete(`/api/comments/${commentId}`)
            .then(() => {
                const updatedComments = comments.filter(comment => comment.id !== commentId);
                setComments(updatedComments);  // Remove the comment from the list
            })
            .catch(error => {
                console.error('Error deleting comment:', error);
            });
    };

    if (!post) return <p>Loading...</p>;
    /* className="bg-white p-8 rounded-lg shadow" */

    return (
        <div className="w-full flex justify-around h-screen">
            <div >
                <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-4">
                    {post.author && post.author.username ? (
                        <>By {post.author.username}</>
                    ) : (
                        <>Unknown Author</>
                    )}
                </p>
                <p className="text-gray-800">{post.text}</p>
            </div>

            <div>
                {isLoading && <p>Updating comment...</p>}

                <h3 className="text-lg font-bold text-center">Comments</h3>
                {comments.length > 0 ? (
                    <ul className="flex flex-col flex-gap">
                        {comments.map(comment => (
                            <li key={comment.id}>
                                <p className="font-style">{comment.text}</p>
                                <small>
                                    {comment.commenter && comment.commenter.username ? (
                                        <>
                                            Commented by: {comment.commenter.username}
                                            <br />
                                            on {new Date(comment.createdAt).toLocaleString()}
                                        </>
                                    ) : (
                                        'Commenter information not available'
                                    )}
                                </small>
                                <section className="flex flex-gap">
                                    {comment.commenterId === userId && (
                                        <button onClick={() => handleEdit(comment.id, comment.text)}>Edit</button>
                                    )}
                                    {(comment.commenterId === userId || userType === 'Admin') && (  // Commenter or Admin can delete
                                        <button onClick={() => handleDelete(comment.id)}>Delete</button>
                                    )}
                                </section>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments yet.</p>
                )}
                
                {editCommentId && (
                    <form onSubmit={handleUpdateComment}>
                        <textarea
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button type="submit">Update Comment</button>
                    </form>
                )}

                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment..."
                        required
                        className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button type="submit">Submit Comment</button>
                </form>

                {error && <p>{error}</p>}
            </div>
        </div>
    );
}

export default PostDetails;
