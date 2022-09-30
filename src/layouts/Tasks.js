import React from "react";
import Nav from '../components/Tasks/Nav';
import AddTask from '../components/Tasks/AddTask';
import TasksBoard from '../components/Tasks/TasksBoard';
import socketIO from 'socket.io-client';

const socket = socketIO.connect(process.env.REACT_APP_SERVER_URL);

const Tasks = () => (
    <>
        <Nav />
        <AddTask socket={socket} />
        <TasksBoard socket={socket} />
    </>
);

export default Tasks;