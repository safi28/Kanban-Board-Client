import React, { FC } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comments/Comments';

const socket = io(process.env.REACT_APP_SERVER_URL || '');

const CommentsLayout: FC = () => {
    const { category, id } = useParams();
    return <Comments socket={socket} category={category} id={id} />;
};

export default CommentsLayout;
