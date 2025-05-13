import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

// Dummy comments data
const dummyComments = [
    {
        id: 1,
        author: "Jane Cooper",
        avatar: "https://picsum.photos/200/295",
        content: "This is really impressive work! I particularly like the attention to detail!",
        timestamp: new Date(2025, 3, 22),
        likes: 12
    },
    {
        id: 2,
        author: "Robert Johnson",
        avatar: "https://picsum.photos/200/296",
        content: "Great job! Are you available for art commission? =)",
        timestamp: new Date(2025, 3, 23),
        likes: 8,
        replies: [
            {
                id: 5,
                author: "Alex Chen",
                avatar: "https://picsum.photos/200/297",
                content: "I second this! Let's start a project together!",
                timestamp: new Date(2025, 3, 23),
                likes: 3
            }
        ]
    },
    {
        id: 3,
        author: "Sarah Williams",
        avatar: "https://picsum.photos/200/298",
        content: "I found a small issue with the implementation. When testing on mobile, the layout breaks at certain viewport widths.",
        timestamp: new Date(2025, 3, 25),
        likes: 5
    },
    {
        id: 4,
        author: "Michael Davis",
        avatar: "https://picsum.photos/200/299",
        content: "This is exactly what I've been looking for! Saved me hours of work. Thanks for sharing.",
        timestamp: new Date(2025, 4, 26),
        likes: 15
    }
];

export const DetailCommentsSection = () => {
    const [comments, setComments] = useState(dummyComments);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState("");

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const newCommentObj = {
            id: comments.length + 10, // Simple ID generation
            author: "Current User",
            avatar: "/api/placeholder/40/40",
            content: newComment,
            timestamp: new Date(),
            likes: 0
        };

        setComments([...comments, newCommentObj]);
        setNewComment("");
    };

    const handleSubmitReply = (commentId) => {
        if (!replyContent.trim()) return;

        const newReply = {
            id: Math.random() * 1000, // Simple ID generation
            author: "Current User",
            avatar: "/api/placeholder/40/40",
            content: replyContent,
            timestamp: new Date(),
            likes: 0
        };

        const updatedComments = comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newReply]
                };
            }
            return comment;
        });

        setComments(updatedComments);
        setReplyContent("");
        setReplyingTo(null);
    };

    const handleLike = (commentId, isReply = false, parentId = null) => {
        if (!isReply) {
            setComments(
                comments.map(comment =>
                    comment.id === commentId
                        ? { ...comment, likes: comment.likes + 1 }
                        : comment
                )
            );
        } else {
            setComments(
                comments.map(comment => {
                    if (comment.id === parentId && comment.replies) {
                        return {
                            ...comment,
                            replies: comment.replies.map(reply =>
                                reply.id === commentId
                                    ? { ...reply, likes: reply.likes + 1 }
                                    : reply
                            )
                        };
                    }
                    return comment;
                })
            );
        }
    };

    const formatTime = (date) => {
        return formatDistanceToNow(date, { addSuffix: true });
    };

    return (
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl shadow-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Comments ({comments.length})</h2>

            {/* New comment form */}
            <form onSubmit={handleSubmitComment} className="mb-8">
                <div className="flex items-start">
                    <img
                        src="https://picsum.photos/200/300"
                        alt="Your avatar"
                        className="rounded-full mr-4 w-10 h-10 border-2 border-white"
                    />
                    <div className="flex-1">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full px-3 py-2 bg-neutral-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-100 placeholder-gray-400"
                            rows="3"
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors duration-200 font-medium"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </form>

            {/* Comments list */}
            <div className="space-y-6">
                {comments.map(comment => (
                    <div key={comment.id} className="border-b border-gray-700 pb-6">
                        <div className="flex items-start">
                            <img
                                src={comment.avatar}
                                alt={`${comment.author}'s avatar`}
                                className="rounded-full mr-4 w-10 h-10 border-2 border-white"
                            />
                            <div className="flex-1">
                                <div className="flex items-center mb-1">
                                    <h3 className="font-semibold mr-2 text-gray-100">{comment.author}</h3>
                                    <span className="text-sm text-gray-400">{formatTime(comment.timestamp)}</span>
                                </div>
                                <p className="text-gray-300 mb-2">{comment.content}</p>
                                <div className="flex items-center text-sm text-gray-400">
                                    <button
                                        onClick={() => handleLike(comment.id)}
                                        className="flex items-center hover:text-violet-400 transition mr-4"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        <span className="text-violet-700">{comment.likes}</span>
                                    </button>
                                    <button
                                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                        className="flex items-center hover:text-violet-400 transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                        </svg>
                                        Reply
                                    </button>
                                </div>

                                {/* Reply form */}
                                {replyingTo === comment.id && (
                                    <div className="mt-3 ml-8">
                                        <div className="flex items-start">
                                            <img
                                                src="https://picsum.photos/200/300"
                                                alt="Your avatar"
                                                className="rounded-full mr-3 w-8 h-8 border-2 border-white"
                                            />
                                            <div className="flex-1">
                                                <textarea
                                                    value={replyContent}
                                                    onChange={(e) => setReplyContent(e.target.value)}
                                                    placeholder="Write a reply..."
                                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-100 placeholder-gray-400"
                                                    rows="2"
                                                ></textarea>
                                                <div className="flex justify-end mt-2">
                                                    <button
                                                        onClick={() => setReplyingTo(null)}
                                                        className="px-3 py-1 text-gray-400 mr-2 hover:text-gray-200 transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => handleSubmitReply(comment.id)}
                                                        className="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors duration-200"
                                                    >
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Replies */}
                                {comment.replies && comment.replies.length > 0 && (
                                    <div className="ml-8 mt-4 space-y-4">
                                        {comment.replies.map(reply => (
                                            <div key={reply.id} className="border-l-2 border-gray-600 pl-4">
                                                <div className="flex items-start">
                                                    <img
                                                        src={reply.avatar}
                                                        alt={`${reply.author}'s avatar`}
                                                        className="rounded-full mr-3 w-8 h-8 border-2 border-white"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center mb-1">
                                                            <h4 className="font-semibold mr-2 text-gray-100">{reply.author}</h4>
                                                            <span className="text-sm text-gray-400">{formatTime(reply.timestamp)}</span>
                                                        </div>
                                                        <p className="text-gray-300 mb-2">{reply.content}</p>
                                                        <button
                                                            onClick={() => handleLike(reply.id, true, comment.id)}
                                                            className="flex items-center text-sm hover:text-violet-400 transition"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                            </svg>
                                                            <span className="text-violet-700">{reply.likes}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};