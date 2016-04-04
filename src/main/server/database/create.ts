import * as Loki from 'lokijs';
import {Post, User} from '../../client/entities';

export const db = new Loki("q&a.db");

export const post = db.addCollection<Post & { type: "QUESTION" | "ANSWER" | "COMMENT"; }>("post", { indices: ["id"] });
export const postToPosts = db.addCollection<{ parentId: number; childId: number; }>("post_to_post");
export const passport = db.addCollection<{ id: number; login: string; password: string; }>("passport", { indices: ["id", "login"]});
export const user = db.addCollection<User>("user", { indices: ["id"] });