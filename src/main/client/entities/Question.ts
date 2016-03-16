import * as Entities from '../entities';

export interface Question extends Entities.Post {
    tags?: string[];
    title?: string;
    comments?: Entities.Comment[];
}
