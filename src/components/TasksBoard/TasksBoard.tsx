import React, { useState, useEffect, FC } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TASKS, TASK_DRAGGED } from '../../CONSTANTS';
import { SocketType } from '../../types/socket';
import { DataType, initialDataType, TaskItemType } from '../../types/tasks';
import Task from '../Task/Task';
import './TasksBoard.scss';

const TasksBoard: FC<SocketType> = ({ socket }) => {
    const [tasks, setTasks] = useState<DataType[]>(initialDataType);

    const fetchTasks = () => {
        fetch(process.env.REACT_APP_SERVER_API)
            .then(async (res) => await res.json())
            .then((data: DataType[]) => setTasks(data))
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .catch(() => {});
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        socket.on(TASKS, (data: DataType[]) => {
            setTasks(data);
        });
    }, [socket]);

    const handleDragEnd = ({ destination, source }: any) => {
        if (!destination) return;
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return;
        }

        socket.emit(TASK_DRAGGED, {
            source,
            destination,
        });
    };

    return (
        <div className='cmp-tasks__board'>
            <DragDropContext onDragEnd={handleDragEnd}>
                {Object.entries(tasks).map((task) => (
                    <div
                        className={`cmp-tasks__board__${task[1].title.toLowerCase()}__wrapper`}
                        key={task[1].title}
                    >
                        <h3 className='cmp-tasks__board__title'>{task[1].title} Tasks</h3>
                        <div
                            className={`cmp-tasks__board__${task[1].title.toLowerCase()}__container`}
                        >
                            <Droppable droppableId={task[1].title}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {task[1].items.map((item: TaskItemType, index: number) => (
                                            // eslint-disable-next-line react/jsx-key
                                            <Task item={item} index={index} task={task[1]} />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
};

export default TasksBoard;
