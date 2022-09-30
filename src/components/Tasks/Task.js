import React from "react";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ item, index, task}) => {
    return (
        <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
        >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${task[1].title.toLowerCase()}__items`}
                >
                    <p>{item.title}</p>
                    <p className='comment'>
                        <Link
                            to={`/comments/${task[1].title}/${item.id}`}
                        >
                            {item.comments.length > 0
                                ? `View Comments`
                                : "Add Comment"}
                        </Link>
                    </p>
                </div>
            )}
        </Draggable>
    )
}

export default Task;