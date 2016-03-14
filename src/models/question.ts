import { CommentModel } from './comment';

export type QuestionModel = {
    title?: string;
    content?: string;
    author?: string;
    date?: string;
    tags?: string[];
    comments?: CommentModel[];
    onAddComment?: (val: string) => any;
};
