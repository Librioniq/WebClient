import {Router} from 'express';
import {isEmpty} from 'lodash';
import * as Services from '../services';


const commentService = new Services.Comment();

export const router = Router();

router.get("/posts/:postId/comments", (req, res) => res.status(200).json(commentService.list(Number(req.params.postId))));
router.get("/posts/:postId/comments/:id", (req, res) => {
    let result;

    isEmpty(result = commentService.findOne(Number(req.params.id), Number(req.params.postId))) ? res.status(404).end('NOT FOUND') : res.status(200).json(result).end();
});
router.post("/posts/:postId/comments", (req, res) => {
    if (req.body && req.body.id === undefined) {
        try {
            res.status(201).json(commentService.add(req.body)).end();
        } catch (e) {
            res.status(500).end(e);
        }
    } else {
        res.status(400).end('BAD REQUEST');
    }
});
router.put("/posts/:postId/comments", (req, res) => {
    if (req.body && req.body.id !== undefined) {
        try {
            res.status(200).json(commentService.update(req.body)).end();
        } catch (e) {
            res.status(500).end(e);
        }
    } else {
        res.status(400).end('BAD REQUEST');
    }
});
router.delete("/posts/:postId/comments/:id", (req, res) => commentService.remove(Number(req.params.id)) ? res.status(204).end() : res.status(400).end('BAD REQUEST, RESOURCE NOT FOUND'));

export default router;
