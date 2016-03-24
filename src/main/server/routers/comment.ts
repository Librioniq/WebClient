import {Comment} from '../../client/entities';
import {Router} from 'express';
import {assign} from 'lodash';

const postId = 0;
const dummyComment: Comment = {
    id: 2,
    content: "Hello world",
    createdBy: "string",
    createdDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    lastModifiedBy: "string",
    lastModifiedDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
    rating: 0
};
export const router = Router();

router.get("/posts/:postId/comments", (req, res) => (req.body && Number(req.params.postId) === postId) ? res.status(200).json([dummyComment]) : res.status(404).end('NOT FOUND'));
router.get("/posts/:postId/comments/:id", (req, res) => (req.body && Number(req.params.postId) === postId && dummyComment.id === Number(req.params.id)) ? res.status(200).json(dummyComment).end() : res.status(404).end('NOT FOUND'));
router.post("/posts/:postId/comments", (req, res) => (req.body && Number(req.params.postId) === postId && req.body.id === undefined) ? res.status(200).json(assign({}, dummyComment, req.body, { id: 1 })).end() : res.status(404).end('NOT FOUND'));
router.put("/posts/:postId/comments", (req, res) => (req.body && Number(req.params.postId) === postId && dummyComment.id === Number(req.body.id)) ? res.status(200).json(assign({}, dummyComment, req.body)).end() : res.status(404).end('NOT FOUND'));
router.delete("/posts/:postId/comments/:id", (req, res) => (req.body && Number(req.params.postId) === postId && dummyComment.id === Number(req.params.id)) ? res.status(204).end() : res.status(404).end('NOT FOUND'));

export default router;