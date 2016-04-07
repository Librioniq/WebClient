import {assign} from 'lodash';
import {user, passport} from '../database';
import {Post} from '../services/Post';
import {Answer, Comment, Question, User} from '../../client/entities';

type PostType = { type: "QUESTION" | "ANSWER" | "COMMENT" };

const postService = new Post();

const dummyPassport = {
    id: 1,
    login: "admin",
    password: "admin"
};
const dummyUser: User = {
    id: 1,
    firstName: "Oleh",
    lastName: "Dokuka",
    avatar: "/images/test.png"
};
const dummyAnswer: Answer & PostType = {
    content: "So you should do that or this or anythings",
    createdBy: "Oleh Dokuka",
    createdDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    lastModifiedBy: "string",
    lastModifiedDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    type: "ANSWER",
    rating: 0
};
const dummyComment: Comment & PostType = {
    content: "Hello world",
    createdBy: "string",
    createdDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    lastModifiedBy: "string",
    lastModifiedDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    type: "COMMENT",
    rating: 0
};
const dummyQuestion: Question & PostType = {
    title: "How To getting sturted with Q&A in PlayTech",
    content: "Hello world",
    createdBy: "Oleh Dokuka",
    createdDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    lastModifiedBy: "string",
    lastModifiedDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    tags: ["Hello World", "Express", "Dev"],
    type: "QUESTION",
    rating: 0
};

export function dbInit() {
    const question = postService.add(dummyQuestion);
    const answer = postService.add(question.id, dummyAnswer);

    postService.add(question.id, dummyComment);
    postService.add(answer.id, dummyComment);

    user.insertOne(assign({}, dummyUser) as any);
    passport.insertOne(assign({}, dummyPassport) as any);
}