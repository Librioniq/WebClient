import {Post} from '../entities';

export interface Question extends Post {
    tags?: string[];
    title: string;
}
