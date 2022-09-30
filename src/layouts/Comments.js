import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { useParams } from "react-router-dom";
import { COMMENTS, FETCH_COMMENTS } from "../CONSTANTS";
import CommentForm from "../components/Comments/CommentForm";
import CommentSection from "../components/Comments/CommentSection";

const socket = socketIO.connect(process.env.REACT_APP_SERVER_URL);

const Comments = () => {
	const { category, id } = useParams();
	const [commentList, setCommentList] = useState([]);

	useEffect(() => {
		socket.emit(FETCH_COMMENTS, { category, id });
	}, [category, id]);

	useEffect(() => {
		socket.on(COMMENTS, (data) => setCommentList(data));
	}, []);

	return (
		<div className='comments__container'>
			<CommentForm socket={socket} category={category} id={id} />
			<div className='comments__section'>
				<CommentSection commentList={commentList} />
			</div>
		</div>
	);
};

export default Comments;