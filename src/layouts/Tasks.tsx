import React, { FC } from "react";
import { io } from 'socket.io-client';
import Nav from '../components/Tasks/Nav';
import AddTask from '../components/Tasks/AddTask';
import TasksBoard from '../components/Tasks/TasksBoard';

const socket = io(process.env.REACT_APP_SERVER_URL || "");

const Tasks: FC = () => (
    <>
        <Nav />
        <AddTask socket={socket} />
        <TasksBoard socket={socket} />
    </>
);

export default Tasks;