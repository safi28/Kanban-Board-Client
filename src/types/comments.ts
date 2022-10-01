export interface CommentFormType {
    socket: any;
    id: string;
    category: string;
}

interface ListItemType {
    id: number;
    text: string;
    name: string;
}

export interface CommentSectionType {
    commentList: Array<ListItemType>
}