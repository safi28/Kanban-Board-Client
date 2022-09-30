import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TASKS, TASK_DRAGGED } from "../../CONSTANTS";
import Task from './Task';

const TasksBoard = ({ socket }) => {
	const [tasks, setTasks] = useState({});

	const fetchTasks = () => {
		fetch(process.env.REACT_APP_SERVER_API)
			.then((res) => res.json())
			.then((data) => setTasks(data));
	}

	useEffect(() => {
		fetchTasks();
	}, []);

	useEffect(() => {
		socket.on(TASKS, (data) => {
			setTasks(data);
		});
	}, [socket]);

	const handleDragEnd = ({ destination, source }) => {
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
		<div className='container'>
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
										{task[1].items.map((item, index) => (
											<Task item={item} index={index} task={task} />
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