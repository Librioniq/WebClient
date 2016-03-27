import {Router} from 'express';
import {isEmpty} from 'lodash';
import * as Services from '../services';

const questionService = new Services.Question();

export const router = Router();

router.get("/questions", ({}, res) => res.status(200).json(questionService.list()));
router.get("/questions/:id", (req, res) => {
    let result;

    isEmpty(result = questionService.findById(Number(req.params.id))) ? res.status(404).end('NOT FOUND') : res.status(200).json(result).end();
});
router.post("/questions", (req, res) => {
    if (req.body && req.body.id === undefined) {
        try {
            res.status(201).json(questionService.add(req.body)).end();
        } catch (e) {
            res.status(500).end(e);
        }
    } else {
        res.status(400).end('BAD REQUEST');
    }
});
router.put("/questions", (req, res) => {
    if (req.body && req.body.id !== undefined) {
        try {
            res.status(200).json(questionService.update(req.body)).end();
        } catch (e) {
            res.status(500).end(e);
        }
    } else {
        res.status(400).end('BAD REQUEST');
    }
});
router.delete("/questions/:id", (req, res) => questionService.remove(Number(req.params.id)) ? res.status(204).end() : res.status(400).end('BAD REQUEST, RESOURCE NOT FOUND'));

export default router;
