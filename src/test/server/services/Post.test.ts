/// <reference path='../../../../typings/main.d.ts'/>
import {expect} from 'chai';
import {assign} from 'lodash';
import {post, postToPosts} from '../../../main/server/database';
import {Post} from '../../../main/server/services/Post';
import {Answer, Comment, Question} from '../../../main/client/entities';


type PostType = { type: "QUESTION" | "ANSWER" | "COMMENT" };


describe("Services", function() {
    const postService = new Post();

    describe("Post Service", function() {
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

        it("should insert items and items should have id", () => {
            const initialSize = post.find().length;
            const insertedComment = postService.add(dummyComment);
            const insertedAnswer = postService.add(dummyAnswer);
            const insertedQuestion = postService.add(dummyQuestion);

            expect(post.find().length).to.be.equals(initialSize + 3);
            expect(insertedComment).have.property("id");
            expect(insertedAnswer).have.property("id").and.itself.to.be.greaterThan(insertedComment.id);
            expect(insertedQuestion).have.property("id").and.itself.to.be.greaterThan(insertedAnswer.id);
        });

        it("should insert items with given parent ID and items should have id", () => {
            const initialPostToPostsSize = postToPosts.find().length;
            const insertedComment = postService.add(1, dummyComment);
            const insertedAnswer = postService.add(1, dummyAnswer);
            const insertedQuestion = postService.add(1, dummyQuestion);

            expect(postToPosts.find().length).to.be.equals(initialPostToPostsSize + 3);
            expect(insertedComment).have.property("id");
            expect(insertedAnswer).have.property("id").and.itself.to.be.greaterThan(insertedComment.id);
            expect(insertedQuestion).have.property("id").and.itself.to.be.greaterThan(insertedAnswer.id);
        });

        it("should list items with type 'QUESTION'", () => {
            const resultListOfQuestion = postService.list("QUESTION");

            expect(resultListOfQuestion).to.be.instanceof(Array);
            expect(resultListOfQuestion.length > 0).to.be.true;
        });

        it("should list items with parent and type 'ANSWER'", () => {
            const resultListOfAnswers = postService.list(1, "ANSWER");

            expect(resultListOfAnswers).to.be.instanceof(Array);
            expect(resultListOfAnswers.length > 0).to.be.true;
        });

        it("should retrieved items", () => {
            const retrievedComment = postService.findOne(3);
            const retrievedAnswer = postService.findOne(4);
            const retrievedQuestion = postService.findOne(5);

            expect(retrievedComment).to.be.not.empty;
            expect(retrievedAnswer).to.be.not.empty;
            expect(retrievedQuestion).to.be.not.empty;
        });

        it("should update item", () => {
            const updatedPost = postService.update(assign({}, dummyQuestion, { id: 3, content: "" }) as Question);

            expect(updatedPost).to.be.not.empty;
            expect(updatedPost.content).to.be.equals("");
        });

        it("should delete items from DB", () => {
            const size = post.find().length;

            postService.remove(3);
            postService.remove(4);
            postService.remove(5);

            expect(post.find().length).to.be.equal(size - 3);
        });
    });
});
