import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskType } from '../../types/tasks';
import { Link } from 'react-router-dom';

const Task: FC<TaskType> = ({ item, index, task }) => {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided: any) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`cmp-tasks__board__${task.title.toLowerCase()}__items`}
                >
                    <p>{item.title}</p>
                    <p className='comment'>
                        <Link to={`/comments/${task.title}/${item.id}`}>
                            {item.comments.length > 0 ? 'View Comments' : 'Add Comment'}
                        </Link>
                    </p>
                </div>
            )}
        </Draggable>
    );
};

export default Task;
