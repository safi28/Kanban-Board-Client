import React, { FC, useState } from "react";
import { ADD_COMMENT } from "../../CONSTANTS";
import { CommentFormType } from "../../types/comments";

const CommentForm: FC<CommentFormType> = ({ socket, category, id }) => {
    const [comment, setComment] = useState("");

    const addComment = (e: any) => {
        e.preventDefault();
        socket.emit(ADD_COMMENT, {
            comment,
            category,
            id,
            userId: localStorage.getItem("userId"),
        });
        setComment("");
    };
    return (
        <form className='comment__form' onSubmit={addComment}>
            <label htmlFor='comment'>Add a comment</label>
            <textarea
                placeholder='Type your comment...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                id='comment'
                name='comment'
                required
            ></textarea>
            <button className='commentBtn'>ADD COMMENT</button>
        </form>
    )
}

export default CommentForm;