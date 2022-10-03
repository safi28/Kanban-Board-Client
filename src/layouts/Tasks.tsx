import React, { FC } from "react";
import { io } from 'socket.io-client';
import Nav from '../components/Nav/Nav';
import TaskForm from '../components/TaskForm/TaskForm';
import TasksBoard from '../components/TasksBoard/TasksBoard';

const socket = io(process.env.REACT_APP_SERVER_URL || "");

const Tasks: FC = () => (
    <>
        <Nav />
        <TaskForm socket={socket} />
        <TasksBoard socket={socket} />
    </>
);

export default Tasks;