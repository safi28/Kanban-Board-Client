import React, { FC, useState } from 'react';
import { CREATE_TASK } from '../../CONSTANTS';
import taskService from '../../services/task.service';
import { SocketType } from '../../types/socket';
import './TaskForm.scss';

const AddTask: FC<SocketType> = ({ socket }) => {
    const [task, setTask] = useState('');

    const handleAddTodo = (e: any) => {
        e.preventDefault();
        socket.emit(CREATE_TASK, { task });
        const newTask = {
            category: 'pending',
            title: task,
            comments: [{}],
        };
        taskService.create(newTask).catch((e) => console.log(e));
        setTask('');
    };

    return (
        <form className='cmp-task__form' onSubmit={handleAddTodo}>
            <label className='cmp-task__form__label' htmlFor='task'>
                Add Todo
            </label>
            <input
                type='text'
                name='task'
                id='task'
                value={task}
                className='cmp-task__form__input'
                required
                onChange={(e) => setTask(e.target.value)}
            />
            <button className='cmp-task__form__btn'>ADD TODO</button>
        </form>
    );
};

export default AddTask;
