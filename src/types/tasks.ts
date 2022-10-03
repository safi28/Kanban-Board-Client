export interface TaskItemType {
    id: string;
    title: string;
    comments: [];
}

export interface DataType {
    title: string;
    items: TaskItemType[];
}

export interface TaskType {
    item: TaskItemType;
    index: number;
    task: DataType;
}

export const initialDataType: DataType[] = [
    { title: '', items: [{ id: '', title: '', comments: [] }] },
];
