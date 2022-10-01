import React, { FC } from "react";
import { CommentSectionType } from "../../types/comments";

const CommentSection: FC<CommentSectionType> = ({ commentList }) => (
    <>
        <h2>Existing Comments</h2>
        {commentList.map((comment) => (
            <div key={comment.id}>
                <p>
                    <span style={{ fontWeight: "bold" }}>{comment.text} </span>by{" "}
                    {comment.name}
                </p>
            </div>
        ))}
    </>
)

export default CommentSection;