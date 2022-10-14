import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COMMENTS, FETCH_COMMENTS } from '../../CONSTANTS';
import { CommentFormType } from '../../types/comments';
import './Comments.scss';
import CommentForm from './CommentForm';
import CommentSection from './CommentSection';
import taskService from '../../services/task.service';

const Comments: FC<CommentFormType> = ({ socket, category, id }) => {
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        socket.emit(FETCH_COMMENTS, { category, id });
    }, [socket, category, id]);

    useEffect(() => {
        socket.on(COMMENTS, (data: any) => setCommentList(data));
        taskService.getComments().then((res) => {
            const data = res.data;
            data.forEach(({ comments }: any) => {
                const commentIndex = commentList.findIndex(
                    (comment) => comment?.id === comments.id,
                );
                if (commentIndex === -1) {
                    setCommentList((prev) => [...prev, comments]);
                }
            });
        });
    }, []);

    return (
        <div className='cmp-comments-page'>
            <Link className='cmp-comments-page__btn' to={`/tasks`}>Back</Link>
            <div className='cmp-comments'>
                <CommentForm socket={socket} category={category} id={id} />
                <div className='cmp-comments__section'>
                    <CommentSection commentList={commentList} />
                </div>
            </div>
        </div>
    );
};

export default Comments;
