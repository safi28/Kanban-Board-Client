import React, { useState, useEffect } from "react";
import { FC } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TASKS, TASK_DRAGGED } from "../../CONSTANTS";
import { SocketType } from "../../types/socket";
import { DataType, initialDataType, TaskItemType } from "../../types/tasks";
import Task from "./Task";

const TasksBoard: FC<SocketType> = ({ socket }) => {
  const [tasks, setTasks] = useState<Array<DataType>>(initialDataType);

  const fetchTasks = () => {
    fetch(process.env.REACT_APP_SERVER_API)
      .then((res) => res.json())
      .then((data: Array<DataType>) => setTasks(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    socket.on(TASKS, (data: Array<DataType>) => {
      setTasks(data);
    });
  }, [socket]);

  const handleDragEnd = ({ destination, source }: any) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    socket.emit(TASK_DRAGGED, {
      source,
      destination,
    });
  };

  return (
    <div className="container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(tasks).map((task) => (
          <div
            className={`${task[1].title.toLowerCase()}__wrapper`}
            key={task[1].title}
          >
            <h3>{task[1].title} Tasks</h3>
            <div className={`${task[1].title.toLowerCase()}__container`}>
              <Droppable droppableId={task[1].title}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {task[1].items.map((item: TaskItemType, index: number) => (
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
