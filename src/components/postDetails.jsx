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

    // Retrieve user info from localStorage
    const userId = localStorage.getItem('userId');  // Logged-in user's ID
    const userType = localStorage.getItem('userType');  // Logged-in user's type (User or Admin)


    // Fetch the post and comments
    useEffect(() => {
        axiosInstance.get(`/api/posts/${postId}`)
            .then(response => {
                setPost(response.data);
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

        axiosInstance.post('/api/comments', {
            text: newComment,
            parentId: postId  
        })
        .then(response => {
            setComments([...comments, response.data]);  
            setNewComment('');  
        })
        .catch(error => {
            console.error('Error submitting comment:',  error.response?.data || error.message);
            setError('Error submitting comment');
        });
    };

    //Handle Editing of Comments
    const handleEdit = (commentId, commentText) => {
        setEditCommentId(commentId);
        setEditCommentText(commentText);
    };

    const handleUpdateComment = (e) => {
        e.preventDefault();

        axiosInstance.patch(`/api/comments/${editCommentId}`, { text: editCommentText })
            .then(response => {
                const updatedComments = comments.map(comment =>
                    comment.id === editCommentId ? response.data : comment
                );
                setComments(updatedComments);
                setEditCommentId(null);  // Clear the edit form
                setEditCommentText('');
            })
            .catch(error => {
                console.error('Error updating comment:', error);
            });
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

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.text}</p>

            <h3>Comments</h3>
            {comments.length > 0 ? (
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id}>
                            <p>{comment.text}</p>
                            {comment.commenterId === userId && (
                                <button onClick={() => handleEdit(comment.id, comment.text)}>Edit</button>
                            )}
                            {(comment.commenterId === userId || userType === 'Admin') && (  // Commenter or Admin can delete
                                <button onClick={() => handleDelete(comment.id)}>Delete</button>
                            )}
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
                />
                <button type="submit">Submit Comment</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
}

export default PostDetails;
