export interface TaskItemType {
  id: string;
  title: string;
  comments: [];
}

export interface DataType {
  title: string;
  items: Array<TaskItemType>;
}

export interface TaskType {
  item: TaskItemType;
  index: number;
  task: DataType;
}

export const initialDataType: Array<DataType> = [
  { title: "", items: [{ id: "", title: "", comments: [] }]},
];
