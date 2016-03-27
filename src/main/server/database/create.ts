import * as Loki from 'lokijs';
import {Post} from '../../client/entities';

export const db = new Loki("q&a.db");

export const post = db.addCollection<Post & { type: "QUESTION" | "ANSWER" | "COMMENT" }>("post", { indices: ['id'] });
export const postToPosts = db.addCollection<{ parentId: number, childId: number }>("post_to_post");
