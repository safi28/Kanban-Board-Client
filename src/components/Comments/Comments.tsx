import React, { FC, useEffect, useState } from "react";
import { COMMENTS, FETCH_COMMENTS } from "../../CONSTANTS";
import { CommentFormType } from "../../types/comments";
import "./Comments.scss"
import CommentForm from "./CommentForm";
import CommentSection from "./CommentSection";

const Comments: FC<CommentFormType> = ({ socket, category, id }) => {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    socket.emit(FETCH_COMMENTS, { category, id });
  }, [socket, category, id]);

  useEffect(() => {
    socket.on(COMMENTS, (data: any) => setCommentList(data));
  }, [socket]);

  return (
    <div className="cmp-comments">
      <CommentForm socket={socket} category={category} id={id} />
      <div className="cmp-comments__section">
        <CommentSection commentList={commentList} />
      </div>
    </div>
  );
};

export default Comments;