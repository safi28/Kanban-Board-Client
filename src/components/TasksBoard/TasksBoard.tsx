import React, { useState, useEffect, FC } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import taskDataService from '../../services/task.service';
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
            .then((data: DataType[]) => {
                setTasks(data);
            })
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

    useEffect(() => {
        taskDataService.getAll().then((e) => {
            const data = e.data;
            data.forEach((task: { id: string; title: string; comments: []; category: string }) => {
                const index = Object.keys(tasks).findIndex((el) => el === task.category);
                if (index !== -1) {
                    const taskEntry = Object.entries(tasks)[index];
                    const finIndex = taskEntry[1].items.findIndex((el) => el.id === task.id);
                    if (finIndex === -1) {
                        taskEntry[1].items.push({
                            id: task.id,
                            title: task.title,
                            comments: task.comments,
                        });
                        setTasks((prev) => ({
                            ...prev,
                            [taskEntry[1].title]: taskEntry[1],
                        }));
                    }
                }
            });
        });
    }, [tasks]);

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
                                            <Task task={task[1]} item={item} index={index} />
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
